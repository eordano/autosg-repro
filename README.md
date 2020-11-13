## Problem between vpc.fromExistingId and AutoScalingGroup for a Cluster

Having this issue when referencing the vpc created in the `infra-repro` stack from within the `service-repro` stack:

```
Previewing update (service-repro):

 +  pulumi:pulumi:Stack service-repro-service-repro create 
 +  awsx:x:ec2:Vpc my-vpc-ref create 
 +  awsx:x:ecs:Cluster mycluster create 
 +  pulumi:pulumi:Stack service-repro-service-repro create read pulumi:pulumi:StackReference infra-repro
 +  awsx:x:ec2:SecurityGroup mycluster create 
 +  awsx:x:autoscaling:AutoScalingGroup autoscaling create 
 +  pulumi:pulumi:Stack service-repro-service-repro create read pulumi:pulumi:StackReference infra-repro
 +  aws:ecs:Cluster mycluster create 
 +  awsx:x:ec2:IngressSecurityGroupRule mycluster-containers create 
 +  awsx:x:ec2:EgressSecurityGroupRule mycluster-egress create 
 +  awsx:x:ec2:IngressSecurityGroupRule mycluster-ssh create 
 +  pulumi:pulumi:Stack service-repro-service-repro create read aws:ec2:Vpc my-vpc-ref
 +  awsx:x:autoscaling:AutoScalingLaunchConfiguration autoscaling create 
 +  aws:s3:Bucket autoscaling create 
 +  aws:iam:Role autoscaling create 
 +  aws:iam:RolePolicyAttachment autoscaling-efc8f10d create 
 +  aws:iam:RolePolicyAttachment autoscaling-5e4162cd create 
 +  aws:iam:InstanceProfile autoscaling create 
 +  pulumi:pulumi:Stack service-repro-service-repro create read aws:ec2:Vpc my-vpc-ref
 +  aws:ec2:SecurityGroup mycluster create 
 +  aws:ec2:SecurityGroupRule mycluster-ssh create 
 +  aws:ec2:SecurityGroupRule mycluster-egress create 
 +  aws:ec2:SecurityGroupRule mycluster-containers create 
 +  aws:ec2:LaunchConfiguration autoscaling create 
 +  pulumi:pulumi:Stack service-repro-service-repro create panic: interface conversion: interface {} is string, not bool
 +  pulumi:pulumi:Stack service-repro-service-repro create goroutine 210 [running]:
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.SerializeValueForHash(0xc0019c0ef0, 0x5b8e640, 0x78f4630, 0xc000f137c0)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/serialize.go:18 +0x965
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.SerializeResourceForHash(0xc0019c0ef0, 0x61f0b20, 0xc001bb1530, 0xc000efba20)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/serialize.go:115 +0x36e
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.HashResource.func1(0x61f0b20, 0xc001bb1530, 0xc001bbe090)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/set.go:32 +0x68
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.(*Set).hash(0xc001bbe080, 0x61f0b20, 0xc001bb1530, 0x1f728d7, 0xc001bbe060)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/set.go:251 +0x3d
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.(*Set).add(0xc001bbe080, 0x61f0b20, 0xc001bb1530, 0x0, 0x61f0b20, 0xc001bb1530)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/set.go:231 +0x83
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.(*Set).Add(...)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/set.go:75
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfshim/sdk-v2.(*diffFieldReader).readSet(0xc001bbe060, 0xc001bb7040, 0x1, 0x1, 0xc000f13900, 0x0, 0x0, 0x0, 0x0, 0x0, ...)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfshim/sdk-v2/diff_reader.go:424 +0x3d9
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfshim/sdk-v2.(*diffFieldReader).ReadField(0xc001bbe060, 0xc001bb7040, 0x1, 0x1, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, ...)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfshim/sdk-v2/diff_reader.go:54 +0x2c7
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfshim/sdk-v2.v2InstanceState.Object.func1(0xc001725bf0, 0x10, 0x0, 0x0)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfshim/sdk-v2/instance_state.go:73 +0x185
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfshim/sdk-v2.v2InstanceState.Object(0xc000725260, 0xc001b88d20, 0x7c78020, 0xc000edfdd0, 0x100cb68, 0xc0019c1620, 0x1009fe8)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfshim/sdk-v2/instance_state.go:90 +0x3f9
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfbridge.MakeTerraformResult(0x7c954e0, 0xc00143ca50, 0x7c5c4e0, 0xc001bb6f90, 0x7c78020, 0xc000edfdd0, 0xc00149b260, 0xc001b94540, 0x1, 0x0, ...)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfbridge/schema.go:594 +0x224
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfbridge.(*Provider).Create(0xc00000a5a0, 0x7c5b3a0, 0xc001b94330, 0xc0019e1ea0, 0xc00000a5a0, 0x6309901, 0xc0019c5a80)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfbridge/provider.go:819 +0x97c
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/pulumi/pulumi/sdk/v2/proto/go._ResourceProvider_Create_Handler.func1(0x7c5b3a0, 0xc001b94330, 0x6dc40a0, 0xc0019e1ea0, 0x6e1e2c0, 0xc00acb8, 0x7c5b3a0, 0xc001b94330)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/pulumi/sdk/v2@v2.12.0/proto/go/provider.pb.go:2244 +0x86
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/grpc-ecosystem/grpc-opentracing/go/otgrpc.OpenTracingServerInterceptor.func1(0x7c5b3a0, 0xc001b94180, 0x6dc40a0, 0xc0019e1ea0, 0xc001b887e0, 0xc001b88800, 0x0, 0x0, 0x7b92620, 0xc000189fa0)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/grpc-ecosystem/grpc-opentracing@v0.0.0-20180507213350-8e809c8a8645/go/otgrpc/server.go:57 +0x2eb
 +  pulumi:pulumi:Stack service-repro-service-repro create github.com/pulumi/pulumi/sdk/v2/proto/go._ResourceProvider_Create_Handler(0x6f13820, 0xc00000a5a0, 0x7c5b3a0, 0xc001b94180, 0xc0013c96e0, 0xc001453560, 0x7c5b3a0, 0xc001b94180, 0xc001b98400, 0x3da)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/github.com/pulumi/pulumi/sdk/v2@v2.12.0/proto/go/provider.pb.go:2246 +0x14b
 +  pulumi:pulumi:Stack service-repro-service-repro create google.golang.org/grpc.(*Server).processUnaryRPC(0xc00084b6c0, 0x7c81ec0, 0xc00159e300, 0xc00166d400, 0xc00152b7a0, 0xbfcc908, 0x0, 0x0, 0x0)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/google.golang.org/grpc@v1.30.0/server.go:1171 +0x50a
 +  pulumi:pulumi:Stack service-repro-service-repro create google.golang.org/grpc.(*Server).handleStream(0xc00084b6c0, 0x7c81ec0, 0xc00159e300, 0xc00166d400, 0x0)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/google.golang.org/grpc@v1.30.0/server.go:1494 +0xccd
 +  pulumi:pulumi:Stack service-repro-service-repro create google.golang.org/grpc.(*Server).serveStreams.func1.2(0xc000aec050, 0xc00084b6c0, 0x7c81ec0, 0xc00159e300, 0xc00166d400)
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/google.golang.org/grpc@v1.30.0/server.go:834 +0xa1
 +  pulumi:pulumi:Stack service-repro-service-repro create created by google.golang.org/grpc.(*Server).serveStreams.func1
 +  pulumi:pulumi:Stack service-repro-service-repro create 	/home/runner/go/pkg/mod/google.golang.org/grpc@v1.30.0/server.go:832 +0x204
 +  aws:ec2:LaunchConfiguration autoscaling create error: Preview failed: transport is closing
 +  pulumi:pulumi:Stack service-repro-service-repro create error: preview failed
 +  aws:ec2:LaunchConfiguration autoscaling create 1 error
 +  pulumi:pulumi:Stack service-repro-service-repro create 1 error; 40 messages
 
Diagnostics:
  aws:ec2:LaunchConfiguration (autoscaling):
    error: Preview failed: transport is closing
 
  pulumi:pulumi:Stack (service-repro-service-repro):
    error: preview failed
 
    panic: interface conversion: interface {} is string, not bool
    goroutine 210 [running]:
    github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.SerializeValueForHash(0xc0019c0ef0, 0x5b8e640, 0x78f4630, 0xc000f137c0)
    	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/serialize.go:18 +0x965
    github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.SerializeResourceForHash(0xc0019c0ef0, 0x61f0b20, 0xc001bb1530, 0xc000efba20)
    	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/serialize.go:115 +0x36e
    github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.HashResource.func1(0x61f0b20, 0xc001bb1530, 0xc001bbe090)
    	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/set.go:32 +0x68
    github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.(*Set).hash(0xc001bbe080, 0x61f0b20, 0xc001bb1530, 0x1f728d7, 0xc001bbe060)
    	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/set.go:251 +0x3d
    github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.(*Set).add(0xc001bbe080, 0x61f0b20, 0xc001bb1530, 0x0, 0x61f0b20, 0xc001bb1530)
    	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/set.go:231 +0x83
    github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema.(*Set).Add(...)
    	/home/runner/go/pkg/mod/github.com/pulumi/terraform-plugin-sdk/v2@v2.0.0-20200910230100-328eb4ff41df/helper/schema/set.go:75
    github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfshim/sdk-v2.(*diffFieldReader).readSet(0xc001bbe060, 0xc001bb7040, 0x1, 0x1, 0xc000f13900, 0x0, 0x0, 0x0, 0x0, 0x0, ...)
    	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfshim/sdk-v2/diff_reader.go:424 +0x3d9
    github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfshim/sdk-v2.(*diffFieldReader).ReadField(0xc001bbe060, 0xc001bb7040, 0x1, 0x1, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, ...)
    	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfshim/sdk-v2/diff_reader.go:54 +0x2c7
    github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfshim/sdk-v2.v2InstanceState.Object.func1(0xc001725bf0, 0x10, 0x0, 0x0)
    	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfshim/sdk-v2/instance_state.go:73 +0x185
    github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfshim/sdk-v2.v2InstanceState.Object(0xc000725260, 0xc001b88d20, 0x7c78020, 0xc000edfdd0, 0x100cb68, 0xc0019c1620, 0x1009fe8)
    	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfshim/sdk-v2/instance_state.go:90 +0x3f9
    github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfbridge.MakeTerraformResult(0x7c954e0, 0xc00143ca50, 0x7c5c4e0, 0xc001bb6f90, 0x7c78020, 0xc000edfdd0, 0xc00149b260, 0xc001b94540, 0x1, 0x0, ...)
    	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfbridge/schema.go:594 +0x224
    github.com/pulumi/pulumi-terraform-bridge/v2/pkg/tfbridge.(*Provider).Create(0xc00000a5a0, 0x7c5b3a0, 0xc001b94330, 0xc0019e1ea0, 0xc00000a5a0, 0x6309901, 0xc0019c5a80)
    	/home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/v2@v2.12.1/pkg/tfbridge/provider.go:819 +0x97c
    github.com/pulumi/pulumi/sdk/v2/proto/go._ResourceProvider_Create_Handler.func1(0x7c5b3a0, 0xc001b94330, 0x6dc40a0, 0xc0019e1ea0, 0x6e1e2c0, 0xc00acb8, 0x7c5b3a0, 0xc001b94330)
    	/home/runner/go/pkg/mod/github.com/pulumi/pulumi/sdk/v2@v2.12.0/proto/go/provider.pb.go:2244 +0x86
    github.com/grpc-ecosystem/grpc-opentracing/go/otgrpc.OpenTracingServerInterceptor.func1(0x7c5b3a0, 0xc001b94180, 0x6dc40a0, 0xc0019e1ea0, 0xc001b887e0, 0xc001b88800, 0x0, 0x0, 0x7b92620, 0xc000189fa0)
    	/home/runner/go/pkg/mod/github.com/grpc-ecosystem/grpc-opentracing@v0.0.0-20180507213350-8e809c8a8645/go/otgrpc/server.go:57 +0x2eb
    github.com/pulumi/pulumi/sdk/v2/proto/go._ResourceProvider_Create_Handler(0x6f13820, 0xc00000a5a0, 0x7c5b3a0, 0xc001b94180, 0xc0013c96e0, 0xc001453560, 0x7c5b3a0, 0xc001b94180, 0xc001b98400, 0x3da)
    	/home/runner/go/pkg/mod/github.com/pulumi/pulumi/sdk/v2@v2.12.0/proto/go/provider.pb.go:2246 +0x14b
    google.golang.org/grpc.(*Server).processUnaryRPC(0xc00084b6c0, 0x7c81ec0, 0xc00159e300, 0xc00166d400, 0xc00152b7a0, 0xbfcc908, 0x0, 0x0, 0x0)
    	/home/runner/go/pkg/mod/google.golang.org/grpc@v1.30.0/server.go:1171 +0x50a
    google.golang.org/grpc.(*Server).handleStream(0xc00084b6c0, 0x7c81ec0, 0xc00159e300, 0xc00166d400, 0x0)
    	/home/runner/go/pkg/mod/google.golang.org/grpc@v1.30.0/server.go:1494 +0xccd
    google.golang.org/grpc.(*Server).serveStreams.func1.2(0xc000aec050, 0xc00084b6c0, 0x7c81ec0, 0xc00159e300, 0xc00166d400)
    	/home/runner/go/pkg/mod/google.golang.org/grpc@v1.30.0/server.go:834 +0xa1
    created by google.golang.org/grpc.(*Server).serveStreams.func1
    	/home/runner/go/pkg/mod/google.golang.org/grpc@v1.30.0/server.go:832 +0x204
 
```
