import React, { useEffect, useState } from 'react';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      const list = await AssessmentService.getList();
      setAssessments(list);
    };

    fetchAssessments();
  }, []);

  return <div>
    <h2>Assessment List</h2>
    <ul>
      {assessments.length === 0 ?
          <li>No assessments available yet.</li> :
          assessments.map((assessment) =>
            <li key={assessment.id || assessment._id || assessment.name || assessment.score}>
              {assessment.catName || assessment.name || `Untitled`} — score {assessment.score ?? `N/A`}
            </li>)}
    </ul>
  </div>;
};
