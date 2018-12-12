node {
    def git = checkout scm
    stage("Clean") {
        sh "echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'"
        sh "git clean -dfxq"
        sh "git stash"
    }
    stage("Install") {
        sh "npm install --prefix game-api"
    }
    stage("ESLint Tests") {
        sh "npm run eslint --prefix game-api"
    }
    stage("Unit Testing") {
        sh "npm run test:unit --prefix game-api"

        step([
        $class: 'CloverPublisher',
         cloverReportDir: 'coverage',
         cloverReportFileName: 'clover.xml',
         healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
         unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
         failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
        ])
    }
    stage("Build API") {
        sh "./scripts/docker_build_api.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push_api.sh ${git.GIT_COMMIT}"
    }
    stage("Build Client") {
        sh "./scripts/docker_build_client.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push_client.sh ${git.GIT_COMMIT}"
    }
    build job: 'API-Test', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]
    build job: 'Capacity-Test', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]
    build job: 'Deployment', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]
}