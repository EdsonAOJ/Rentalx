import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRouter } from './users.routes';
import { carsRoutes } from './cars.routes';
import { rentalRoutes } from './rental.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRouter);
router.use('/cars', carsRoutes);
router.use('/rentals', rentalRoutes);
router.use(authenticateRoutes);

export default router;
