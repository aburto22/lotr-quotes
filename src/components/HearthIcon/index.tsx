interface HearthIconProps {
  isFavourite: boolean;
}

const HearthIcon = ({ isFavourite }: HearthIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`hearth-icon ${isFavourite ? "hearth-icon--favourite" : ""}`}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <style jsx>{`
      svg {
        width: 2.5rem;
        height: 2.5rem;
        padding: 0.3rem;
        fill: ${isFavourite ? "white" : "none"};
        color: white;
      }

      svg:hover {
        fill: white;
      }
    `}</style>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

export default HearthIcon;
