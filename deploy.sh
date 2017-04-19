#!/bin/bash
set -x # echo on
set -e # exit on error

APP_STAGE=$1
if [ -z "$APP_STAGE" ]
then
  echo "Usage: deploy.sh <test|prod>"
  exit 1
fi

if [ "$APP_STAGE" = "test" ]
then
  DEPLOY_HOSTS=("ec2-54-148-139-126.us-west-2.compute.amazonaws.com")
  DEPLOY_USER="ubuntu"

elif [ "$APP_STAGE" = "prod" ]
then
  DEPLOY_HOSTS=("ec2-54-148-139-126.us-west-2.compute.amazonaws.com")
  DEPLOY_USER="ubuntu"
else
    echo "env should be test or prod"
    exit 1
fi

DEPLOY_DIR="~/eatler"
REMOTE_MACHINE_SSH_IDENTITY=~/Downloads/Eatler.pem

CUR_TS=`date +%s`000
REMOTE_TAR_NAME="eatler-$CUR_TS-1.0-SNAPSHOT.tgz"
DEPLOY_DIR_WITH_TS=`echo ${REMOTE_TAR_NAME} | cut -d '-' -f 1,2,3`

SSH="ssh -i $REMOTE_MACHINE_SSH_IDENTITY"
SCP="scp -i $REMOTE_MACHINE_SSH_IDENTITY"

# Create the tar file
npm run build
mkdir -p target
rm -f target/eatler-1.0-SNAPSHOT.tar.gz
tar -zcvf target/eatler-1.0-SNAPSHOT.tar.gz build

for DEPLOY_HOST in "${DEPLOY_HOSTS[@]}"
do
  $SCP target/eatler-1.0-SNAPSHOT.tar.gz ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/${REMOTE_TAR_NAME}

#unroll
  $SSH ${DEPLOY_USER}@${DEPLOY_HOST}.${DOMAIN_NAME} "mkdir -p $DEPLOY_DIR && cd $DEPLOY_DIR && mkdir -p ${DEPLOY_DIR_WITH_TS} && tar -xzvf /tmp/${REMOTE_TAR_NAME} -C ${DEPLOY_DIR}/${DEPLOY_DIR_WITH_TS} --strip-components=1"

#change softlink and kill and start the app
  $SSH ${DEPLOY_USER}@${DEPLOY_HOST} "export APP_STAGE=${APP_STAGE} && rm -rf ${DEPLOY_DIR}/current && ln -s ${DEPLOY_DIR}/${DEPLOY_DIR_WITH_TS} ${DEPLOY_DIR}/current"
done
