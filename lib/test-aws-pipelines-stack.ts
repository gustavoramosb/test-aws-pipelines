import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

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
            authentication: cdk.SecretValue.unsafePlainText('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')
          }
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
  }
}
