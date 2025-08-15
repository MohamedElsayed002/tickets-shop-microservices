tsc --init 
npm install typescript del-cli --save-dev

git add . 
git commit -m ""
npm version patch
npm run build
npm publish

moved errors and middleware from auth

npm install @YOUR_ORG_NAME/common@latest

------------------------------------------

Section 13 

- Create package.josn, install deps 
- Write Dockerfile 
- Create index.ts to run project 
- Build image, push to docker hub 

docker build -t moham/tickets
docker push moham/tickets


- Write k8s file for deployment, service

done file tickets-depl.yaml

- Update skaffold.yaml to do file sync for tickets

done

- Write k8s file for MongoDB deployment, service


tickets-mongo-depl.yaml


----------------------------

Section 14 NATS Streaming Server 

hub.docker.com

- Docs at docs.nats.io
- NATS and NATS Streaming Server are two different things
- NATS Streaming implements some extraordinary important design decisions that will affect our app
- We are going to run the official 'nats-streaming' docker image in kubernetes. Need to read the image's docs


-----------------------------------


# Section 17: Cross-Service Data Replication In Action 

- Duplicate the 'tickets' services 
- Install dependencies
- Build an image out of the orders service 
- Create a Kubernetes deployment file 
- Set up file sync options in the skaffold.yaml file 
- Setup up routing rules in the ingress service 


# Save key 

kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=TOKEN
kubectl get secrets