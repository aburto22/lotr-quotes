import { colors } from "@styles/cssVariables";

const Footer = () => (
  <footer>
    <style jsx>{`
      footer {
        margin-top: auto;
        padding: 1rem;
        background-color: ${colors["transparent-blue"]};
      }

      p {
        color: ${colors.lightblue};
        text-align: center;
        font-size: 0.6rem;
      }
    `}</style>

    <p>Created by Alejandro Aburto Salazar for &lt;/Salt&gt;</p>
  </footer>
);

export default Footer;
