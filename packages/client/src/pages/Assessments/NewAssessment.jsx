import { useState } from 'react';

export const NewAssessment = () => {
  const [ catName, setCatName ] = useState(``);
  const [ catDateOfBirth, setCatDateOfBirth ] = useState(``);
  const [ judicialContact, setJudicialContact ] = useState(``);
  const [ catAltercations, setCatAltercations ] = useState(``);
  const [ ownerAltercations, setOwnerAltercations ] = useState(``);
  const [ playsWithDogs, setPlaysWithDogs ] = useState(``);
  const [ hissesAtStrangers, setHissesAtStrangers ] = useState(``);
  const [ message, setMessage ] = useState(``);
  const [ error, setError ] = useState(``);

  const calculateScore = () => {
    let score = 0;
    if (judicialContact === `Yes`) {
      score += 1;
    }
    if (catAltercations === `3+`) {
      score += 1;
    }
    if (ownerAltercations === `10+`) {
      score += 1;
    }
    if (playsWithDogs === `No`) {
      score += 1;
    }
    if (hissesAtStrangers === `Yes`) {
      score += 1;
    }
    return score;
  };

  const calculateRiskLevel = (score) => {
    if (score >= 4) {
      return `Critical`;
    }
    if (score >= 3) {
      return `High`;
    }
    if (score >= 2) {
      return `Medium`;
    }
    return `Low`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(``);
    setMessage(``);

    const score = calculateScore();
    const riskLevel = calculateRiskLevel(score);

    const payload = {
      catDateOfBirth,
      catName,
      instrumentType: `Cat Behavioral Instrument`,
      riskLevel,
      score,
    };

    try {
      const response = await fetch(`/api/assessments`, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': `application/json` },
        method: `POST`,
      });
      console.log(`here`);

      if (!response.ok) {
        throw new Error(`Failed to submit assessment`);
      }

      const result = await response.json();
      setMessage(`Assessment completed! ID: ${result.id || `Unknown`}`);

      // Reset form
      setCatName(``);
      setCatDateOfBirth(``);
      setJudicialContact(``);
      setCatAltercations(``);
      setOwnerAltercations(``);
      setPlaysWithDogs(``);
      setHissesAtStrangers(``);
    } catch (err) {
      setError(err.message);
    }
  };

  return <div style={{ margin: `0 auto`, maxWidth: `600px`, padding: `20px` }}>
    <h2>Cat Assessment</h2>

    {message && <div style={{ color: `green`, marginBottom: `10px` }}>{message}</div>}
    {error && <div style={{ color: `red`, marginBottom: `10px` }}>{error}</div>}

    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: `15px` }}>
        <label htmlFor="cat-name">Cat Name:</label>
        <br />
        <input
          id="cat-name"
          type="text"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          required
          style={{ padding: `5px`, width: `100%` }}
        />
      </div>

      <div style={{ marginBottom: `15px` }}>
        <label htmlFor="cat-dob">Cat Date of Birth:</label>
        <br />
        <input
          id="cat-dob"
          type="date"
          value={catDateOfBirth}
          onChange={(e) => setCatDateOfBirth(e.target.value)}
          required
          style={{ padding: `5px`, width: `100%` }}
        />
      </div>

      <div style={{ marginBottom: `15px` }}>
        <strong>Previous contact with the Cat Judicial System:</strong>
        <br />
        <label htmlFor="judicial-no">
          <input
            id="judicial-no"
            type="radio"
            name="judicial"
            value="No"
            checked={judicialContact === `No`}
            onChange={(e) => setJudicialContact(e.target.value)}
            required
          />
          {` `}
          No
        </label>
        <label htmlFor="judicial-yes" style={{ marginLeft: `15px` }}>
          <input
            id="judicial-yes"
            type="radio"
            name="judicial"
            value="Yes"
            checked={judicialContact === `Yes`}
            onChange={(e) => setJudicialContact(e.target.value)}
            required
          />
          {` `}
          Yes
        </label>
      </div>

      <div style={{ marginBottom: `15px` }}>
        <strong>Physical altercations with other cats:</strong>
        <br />
        <label htmlFor="cat-alt-0-3-radio">
          <input
            id="cat-alt-0-3-radio"
            type="radio"
            name="catAlt"
            value="0-3"
            checked={catAltercations === `0-3`}
            onChange={(e) => setCatAltercations(e.target.value)}
            required
          />
          {` `}
          0-3 altercations
        </label>
        <label htmlFor="cat-alt-3-plus" style={{ marginLeft: `15px` }}>
          <input
            id="cat-alt-3-plus"
            type="radio"
            name="catAlt"
            value="3+"
            checked={catAltercations === `3+`}
            onChange={(e) => setCatAltercations(e.target.value)}
            required
          />
          {` `}
          3+ altercations
        </label>
      </div>

      <div style={{ marginBottom: `15px` }}>
        <label htmlFor="owner-alt-10-plus">Physical altercations with owner:</label>
        <br />
        <label htmlFor="owner-alt-10-plus-radio">
          <input
            id="owner-alt-10-plus-radio"
            type="radio"
            name="ownerAlt"
            value="10+"
            checked={ownerAltercations === `10+`}
            onChange={(e) => setOwnerAltercations(e.target.value)}
            required
          />
          {` `}
          10+ altercations
        </label>
        <label htmlFor="owner-alt-0-10" style={{ marginLeft: `15px` }}>
          <input
            id="owner-alt-0-10"
            type="radio"
            name="ownerAlt"
            value="0-10"
            checked={ownerAltercations === `0-10`}
            onChange={(e) => setOwnerAltercations(e.target.value)}
            required
          />
          {` `}
          0-10 altercations
        </label>
      </div>

      <div style={{ marginBottom: `15px` }}>
        <label htmlFor="plays-with-dogs">Plays well with dogs:</label>
        <br />
        <label htmlFor="plays-with-dogs-no">
          <input
            id="plays-with-dogs-no"
            type="radio"
            name="dogs"
            value="No"
            checked={playsWithDogs === `No`}
            onChange={(e) => setPlaysWithDogs(e.target.value)}
            required
          />
          {` `}
          No
        </label>
        <label htmlFor="plays-with-dogs-yes" style={{ marginLeft: `15px` }}>
          <input
            id="plays-with-dogs-yes"
            type="radio"
            name="dogs"
            value="Yes"
            checked={playsWithDogs === `Yes`}
            onChange={(e) => setPlaysWithDogs(e.target.value)}
            required
          />
          {` `}
          Yes
        </label>
      </div>

      <div style={{ marginBottom: `15px` }}>
        <label htmlFor="hisses-at-strangers">Hisses at strangers:</label>
        <br />
        <label htmlFor="hisses-yes">
          <input
            id="hisses-yes"
            type="radio"
            name="hiss"
            value="Yes"
            checked={hissesAtStrangers === `Yes`}
            onChange={(e) => setHissesAtStrangers(e.target.value)}
            required
          />
          {` `}
          Yes
        </label>
        <label htmlFor="hisses-no" style={{ marginLeft: `15px` }}>
          <input
            id="hisses-no"
            type="radio"
            name="hiss"
            value="No"
            checked={hissesAtStrangers === `No`}
            onChange={(e) => setHissesAtStrangers(e.target.value)}
            required
          />
          {` `}
          No
        </label>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: `#007bff`,
          border: `none`,
          borderRadius: `4px`,
          color: `white`,
          padding: `10px 20px`,
        }}
      >
        Complete Assessment
      </button>
    </form>
  </div>;
};
