version = 0.1
[y.deploy.parameters]
stack_name = "sam-app"
resolve_s3 = true
s3_prefix = "sam-app"
region = "us-east-2"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
image_repositories = []
