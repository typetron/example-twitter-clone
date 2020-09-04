import { TestCase as BaseTestCase } from '@Typetron/Testing/TestCase';
import { Application } from '@Typetron/Framework';
import * as path from 'path';

export class TestCase extends BaseTestCase {

    static app: Application;

    async bootstrapApp() {
        if (TestCase.app) {
            this.app = TestCase.app;
            return;
        }
        const app = await Application.create(path.join(__dirname, '..'));
        TestCase.app = this.app = app;
    }
}
