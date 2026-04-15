variable "ssh_key_name" {
    description = "Name of an existing EC2 key pair to SSH into worker nodes"
    type = string
    default = "demo_12"
}