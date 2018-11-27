#!/bin/bash

echo "Destorying Terraform, please wait..."
terraform destroy -auto-approve

echo "Applying Terraform , please wait..."
terraform apply -auto-approve

echo "Initializing a new instance on server"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
