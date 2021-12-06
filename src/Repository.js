import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { filter } from "graphql-anywhere";
import { Languages } from "./Languages";

const REPOSITORY_QUERY = gql`
{
  repositoryOwner(login: "F3RN4ND02") {
    repositories(first:6, privacy:PUBLIC, isFork:false,  orderBy:{field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        primaryLanguage {
          name
          id
        }
        updatedAt
        createdAt
        id
      }
    }
  }
}
`;

const FDO_REPOS = gql`
{
  repositoryOwner(login: "F3RN4ND02") {
    repositories(first:6, privacy:PUBLIC, isFork:false,  orderBy:{field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        primaryLanguage {
          name
          id
        }
        updatedAt
        createdAt
        id
      }
    }
  }
}
${Languages.fragments.repository}
`
function Repository({id, name, updatedAt, language, createdAt}) {
  const { data, loading, error } = useQuery(REPOSITORY_QUERY);

  if (error) return <div>error...</div>;
  if (loading || !data) return <div>loading...</div>;

 // return <pre>{JSON.stringify(data, null, 2)}</pre>;

  return (
    <div>
        {data.repositoryOwner.repositories.nodes.map(nodes => (
          <>
          <li key={nodes.id}>{nodes.name}</li>
          <li key={nodes.id}>{nodes.createdAt}</li>
          </>
        ))}
        {data.repositoryOwner.repositories.nodes.map(primaryLanguage => (
          <>
          <li key={primaryLanguage.id}>{primaryLanguage.name}</li>
          </>
        ))}
    </div>
  );
}

export { Repository };
