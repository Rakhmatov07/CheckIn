import express from 'express';
const app = express();
import { modules } from './start/modules.js';
import { run } from './start/run.js';

modules(app);
run(app);

