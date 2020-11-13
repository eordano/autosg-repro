import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

export const vpc = new awsx.ec2.Vpc('infra-vpc', {
  numberOfAvailabilityZones: 2,
  subnets: [
    { type: 'public', name: 'pub' },
    { type: 'private', name: 'priv' },
  ]
})
export const vpcId = vpc.id;
