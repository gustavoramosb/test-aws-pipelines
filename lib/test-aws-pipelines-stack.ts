import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './pipeline-stage';

export class TestAwsPipelinesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestAWSPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(
          'gustavoramosb/test-aws-pipelines', 
          'main', 
          {
            authentication: cdk.SecretValue.unsafePlainText(atob('Z2hwX2VuTVd3TUszQWlmOXpHZ09yZ3JteFNBeHgzN0cydTBST2JGbA==') )
          }
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    pipeline.addStage(new MyPipelineAppStage(this, "test-stage", {
      env: { account: "840315316600", region: "us-west-2" }
    }));
  }
}
