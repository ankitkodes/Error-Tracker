provider "aws" {
    region = "us-east-1"
}

resource "aws_vpc" "bug_tracker_vpc" {
    cidr_block = "10.0.0.0/16"
    enable_dns_hostnames = true
    enable_dns_support = true

    assign_generated_ipv6_cidr_block = true


    tags = {
        Name = "bug-tracker-vpc"
    }
}

resource "aws_subnet" "bug_tracker_subnet" {
    count = 2
    vpc_id = aws_vpc.bug_tracker_vpc.id
    cidr_block = cidrsubnet(aws_vpc.bug_tracker_vpc.cidr_block, 8, count.index)
    availability_zone = element(["us-east-1a", "us-east-1b"], count.index)
    map_public_ip_on_launch = true

    tags = {
        Name = "bug-tracker-subnet-${count.index}"
    }
}

resource "aws_internet_gateway" "bug_tracker_igw" {
    vpc_id = aws_vpc.bug_tracker_vpc.id

    tags = {
        Name = "bug-tracker-igw"
    }
}

resource "aws_route_table" "bug_tracker_rt" {
    vpc_id = aws_vpc.bug_tracker_vpc.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.bug_tracker_igw.id
    }

    tags = {
        Name = "bug-tracker-route-table"
    }
}

resource "aws_route_table_association" "a" {
    count = 2
    subnet_id = aws_subnet.bug_tracker_subnet[count.index].id
    route_table_id = aws_route_table.bug_tracker_rt.id
}

resource "aws_security_group" "bug_tracker_cluster_sg" {
    vpc_id = aws_vpc.bug_tracker_vpc.id
    name   = "bug-tracker-cluster-sg"

    ingress {
        description = "Allow worker nodes to communicate with the EKS cluster API server"
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
}

    egress {
        description = "Allow all outbound traffic"
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
}
    
    tags = {
        Name = "bug-tracker-cluster-sg"
    }
}

resource "aws_security_group" "bug_tracker_node_sg" {
    vpc_id = aws_vpc.bug_tracker_vpc.id
    name   = "bug-tracker-node-sg"

    ingress {
        description = "Allow worker nodes to communicate with each other"
        from_port   = 0
        to_port     = 65535
        protocol    = "tcp"
        self        = true
    }

    ingress {
        description     = "Allow EKS control plane to communicate with worker nodes"
        from_port       = 10250
        to_port         = 10250
        protocol        = "tcp"
        security_groups = [aws_security_group.bug_tracker_cluster_sg.id]
}

    egress {
        description = "Allow all outbound traffic"
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "bug-tracker-node-sg"
    }
}

resource "aws_security_group" "bug_tracker_lb_sg" {
    vpc_id = aws_vpc.bug_tracker_vpc.id
    name   = "bug-tracker-lb-sg"

    ingress {
        description = "Allow inbound HTTP traffic"
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "Allow inbound HTTPS traffic"
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        description = "Allow all outbound from LB"
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "bug-tracker-lb-sg"
    }
}

resource "aws_security_group_rule" "allow_lb_to_nodes" {
    description              = "Allow load balancer to communicate with worker nodes"
    type                     = "ingress"
    from_port                = 0
    to_port                  = 65535
    protocol                 = "tcp"
    security_group_id        = aws_security_group.bug_tracker_node_sg.id
    source_security_group_id = aws_security_group.bug_tracker_lb_sg.id
}

resource "aws_security_group" "admin_ssh" {
    vpc_id = aws_vpc.bug_tracker_vpc.id
    name   = "admin-ssh"

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"] 
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "admin-ssh"
    }
}

resource "aws_launch_template" "bug_tracker_lt" {
    name_prefix = "bug-tracker-lt-"
    network_interfaces {
        security_groups = [aws_security_group.bug_tracker_node_sg.id]
    }
}

resource "aws_iam_role" "bug_tracker_eks_cluster_role" {
    name = "bug-tracker-eks-cluster-role"
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Effect = "Allow"
                Principal = {
                    Service = "eks.amazonaws.com"
                }
                Action = "sts:AssumeRole"
            }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "bug_tracker_eks_cluster_AmazonEKSClusterPolicy" {
    role = aws_iam_role.bug_tracker_eks_cluster_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_iam_role_policy_attachment" "bug_tracker_eks_cluster_AmazonEKSServicePolicy" {
    role = aws_iam_role.bug_tracker_eks_cluster_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKSServicePolicy"
}

resource "aws_iam_role" "bug_tracker_node_role" {
    name = "bug-tracker-node-role"
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Effect = "Allow"
                Principal = {
                    Service = "ec2.amazonaws.com"
                }
                Action = "sts:AssumeRole"
            }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "AmazonEKSWorkerNodePolicy" {
    role = aws_iam_role.bug_tracker_node_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy_attachment" "AmazonEKS_CNI_Policy" {
    role = aws_iam_role.bug_tracker_node_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "AmazonEC2ContainerRegistryReadOnly" {
    role = aws_iam_role.bug_tracker_node_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_eks_cluster" "bug_tracker" {
    name = "bug-tracker-cluster"
    role_arn = aws_iam_role.bug_tracker_eks_cluster_role.arn

    vpc_config {
        subnet_ids = aws_subnet.bug_tracker_subnet[*].id
        security_group_ids = [aws_security_group.bug_tracker_cluster_sg.id]
        endpoint_public_access = true
        endpoint_private_access = false
    }
    depends_on = [ 
        aws_iam_role_policy_attachment.bug_tracker_eks_cluster_AmazonEKSClusterPolicy,
        aws_iam_role_policy_attachment.bug_tracker_eks_cluster_AmazonEKSServicePolicy
    ]
}

resource "aws_eks_node_group" "bug_tracker" {
    cluster_name = aws_eks_cluster.bug_tracker.name
    node_group_name = "bug-tracker-node-group"
    node_role_arn = aws_iam_role.bug_tracker_node_role.arn
    subnet_ids = aws_subnet.bug_tracker_subnet[*].id

    scaling_config {
        desired_size = 2
        max_size = 2
        min_size = 1
    }
    instance_types = ["t3.medium"]

    remote_access {
        ec2_ssh_key = var.ssh_key_name
        source_security_group_ids = [aws_security_group.bug_tracker_node_sg.id]
    }

    depends_on = [ 
        aws_iam_role_policy_attachment.AmazonEKSWorkerNodePolicy,
        aws_iam_role_policy_attachment.AmazonEKS_CNI_Policy,
        aws_iam_role_policy_attachment.AmazonEC2ContainerRegistryReadOnly
    ]
}