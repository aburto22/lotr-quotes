interface CharacterPropertyProps {
  label: string;
  prop: string | null;
}

const CharacterProperty = ({ label, prop }: CharacterPropertyProps) => {
  if (!prop || prop === "NaN") {
    return null;
  }

  return (
    <p>
      <style jsx>{`
        p {
          margin-bottom: 0.2rem;
          padding: 0 1rem 0;
          color: white;
        }
      `}</style>
      {label}: {prop}
    </p>
  );
};

export default CharacterProperty;
