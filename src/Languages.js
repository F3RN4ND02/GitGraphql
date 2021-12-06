import React from "react";
import { gql } from "apollo-boost";

const LANGUAGE_FRAGMENT = gql`
  fragment LanguageFragment on Repository {
    primaryLanguage {
      name
      id
    }
  }
`;

function Languages({ repository }) {
  return (
    <ul>
      {repository.languages.nodes.map(language => (
        <li key={language.id}>{language.name}</li>
      ))}
    </ul>
  );
}

Languages.fragments = {
  repository: LANGUAGE_FRAGMENT
};

export { Languages };
