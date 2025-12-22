output "cluster_id" {
    value = aws_eks_cluster.bug_tracker.id
}

output "vpc_id" {
    value = aws_vpc.bug_tracker_vpc.id
}

output "subnet_ids" {
    value = aws_subnet.bug_tracker_subnet[*].id
}