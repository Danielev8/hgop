#!/bin/bash

echo "Destorying Terraform, please wait... (If it is taking longer than expected, session token has likely timed out)"
terraform destroy -auto-approve

echo "Applying Terraform, please wait... (If it is taking longer than expected, session token has likely timed out)"
terraform apply -auto-approve

echo "Initializing a new instance on server"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
