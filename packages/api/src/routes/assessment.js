import { Router } from 'express';
import { AssessmentService } from '../application/services/index.js';

const router = Router();

router.post(`/`, async (req, res) => {
  try {
    // Get data from request body
    const assessmentData = req.body;

    // Call service layer
    const assessment = await AssessmentService.create(assessmentData);

    // Return created resource
    res.status(201).json(assessment);
  } catch (err) {
    console.error(`Error creating assessment:`, err);
    res.status(500).json({
      message: err.message || `Internal Server Error`,
    });
  }
});

export { router };
