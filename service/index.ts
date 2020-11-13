import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const infra = new pulumi.StackReference('infra-repro')
const vpcId = infra.getOutputValue('vpcId')
const vpc = awsx.ec2.Vpc.fromExistingIds(`my-vpc-ref`, {
  vpcId
})
const myCluster = new awsx.ecs.Cluster('mycluster', {
  vpc
});

myCluster.createAutoScalingGroup('autoscaling', {
  vpc,
  templateParameters: {
    minSize: 1,
    desiredCapacity: 1
  },
  launchConfigurationArgs: {
    associatePublicIpAddress: false,
    rootBlockDevice: {
      volumeSize: 50
    },
    instanceType: "t3.xlarge",
  },
})
