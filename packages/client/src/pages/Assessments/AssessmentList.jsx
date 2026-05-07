import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  const [ error, setError ] = useState([]);
  const [ sortField, setSortField ] = useState(`createdAt`);
  const [ sortDirection, setSortDirection ] = useState(`desc`);
  const [ filterText, setFilterText ] = useState(``);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const list = await AssessmentService.getList();
        setAssessments(list);
        setError([]);
      } catch (err) {
        setError([ err.message ]);
        setAssessments([]);
      }
    };

    fetchAssessments();
  }, []);

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === `asc` ? `desc` : `asc`;
    setSortField(field);
    setSortDirection(direction);
  };

  const filteredAndSortedAssessments = useMemo(() => {
    const filtered = assessments.filter((assessment) =>
      assessment.catName.toLowerCase().includes(filterText.toLowerCase()) ||
      assessment.instrumentType.toLowerCase().includes(filterText.toLowerCase()) ||
      assessment.riskLevel.toLowerCase().includes(filterText.toLowerCase()));

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === `catDateOfBirth` || sortField === `createdAt`) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return sortDirection === `asc` ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === `asc` ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [ assessments, sortField, sortDirection, filterText ]);

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return ` ↕️`;
    }
    return sortDirection === `asc` ? ` ↑` : ` ↓`;
  };

  const handleDelete = async (id) => {
    try {
      await AssessmentService.delete(id);
      setAssessments(assessments.filter((assessment) => assessment.id !== id));
    } catch (err) {
      setError([ err.message ]);
    }
  };

  return <Container>
    <Row>
      <Col>
        <h2 className="my-4">Assessment List</h2>
        <Form.Group className="mb-3">
          <InputGroup>
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Filter by cat name, instrument, or risk level"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        {error.length > 0 &&
          <Alert variant="danger">
            {error.map((err, index) => <div key={index}>{err}</div>)}
          </Alert>}
        {filteredAndSortedAssessments.length === 0 && assessments.length > 0 ?
          <Alert variant="info">No assessments match your filter.</Alert> :
          filteredAndSortedAssessments.length === 0 ?
            <Alert variant="info">No assessments available yet.</Alert> :
              <Table striped bordered hover responsive>
              <thead>
                  <tr>
                  <th onClick={() => handleSort(`catName`)} style={{ cursor: `pointer` }}>
                      Cat Name{getSortIcon(`catName`)}
                    </th>
                  <th onClick={() => handleSort(`catDateOfBirth`)} style={{ cursor: `pointer` }}>
                      Date of Birth{getSortIcon(`catDateOfBirth`)}
                    </th>
                  <th onClick={() => handleSort(`instrumentType`)} style={{ cursor: `pointer` }}>
                      Instrument{getSortIcon(`instrumentType`)}
                    </th>
                  <th onClick={() => handleSort(`score`)} style={{ cursor: `pointer` }}>
                      Score{getSortIcon(`score`)}
                    </th>
                  <th onClick={() => handleSort(`riskLevel`)} style={{ cursor: `pointer` }}>
                      Risk Level{getSortIcon(`riskLevel`)}
                    </th>
                  <th onClick={() => handleSort(`createdAt`)} style={{ cursor: `pointer` }}>
                      Created At{getSortIcon(`createdAt`)}
                    </th>
                  <th>Actions</th>
                </tr>
                </thead>

              <tbody>
                  {filteredAndSortedAssessments.map((assessment) =>
                  <tr key={assessment.id}>
                      <td>{assessment.catName}</td>
                      <td>{new Date(assessment.catDateOfBirth).toLocaleDateString()}</td>
                      <td>{assessment.instrumentType}</td>
                      <td>{assessment.score}</td>
                      <td>
                      <span className={`badge ${assessment.riskLevel === `Low` ? `bg-success` :
                          assessment.riskLevel === `Medium` ? `bg-warning` :
                            assessment.riskLevel === `High` ? `bg-danger` :
                              `bg-dark`
                        }`}
                        >
                          {assessment.riskLevel}
                        </span>
                    </td>
                      <td>{new Date(assessment.createdAt).toLocaleString()}</td>
                      <td>
                      <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(assessment.id)}
                        >
                          Delete
                        </Button>
                    </td>
                    </tr>)}
                </tbody>
            </Table>}
      </Col>
    </Row>
  </Container>;
};
