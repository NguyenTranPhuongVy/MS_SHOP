import express from 'express';
import siteController from '../controllers/SiteController.js';

const router = express.Router();

router.get('/', siteController.getHome);

export default router;