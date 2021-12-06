import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const REPOSITORY_QUERY = gql`
{
  repositoryOwner(login: "F3RN4ND02") {
    repositories(first:6, privacy:PUBLIC, isFork:false,  orderBy:{field: UPDATED_AT, direction: DESC}) {
      nodes {
        id
        url
        name
        primaryLanguage {
          name
          id
        }
        updatedAt
        createdAt
      }
    }
  }
}
`;



function Repository() {
  const { data, loading, error } = useQuery(REPOSITORY_QUERY);

  if (error) return <div>error...</div>;
  if (loading || !data) return <div>loading...</div>;

 // return <pre>{JSON.stringify(data, null, 2)}</pre>;
 // <li key={nodes.id}>{nodes.name}</li>
 //         <li key={nodes.id}>{nodes.updatedAt}</li>
 //         <li key={nodes.id}>{nodes.url}</li>
 //         <li key={nodes.primaryLanguage.id}></li>

  return (
    <div>
        {data.repositoryOwner.repositories.nodes.map(nodes => (
          <>
         
    <CardContent>
      <Typography key={nodes.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       {nodes.updatedAt}
      </Typography>
      <Typography variant="h5" component="div">
        {nodes.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {nodes.primaryLanguage.name}
      </Typography>
    </CardContent>
          </>
        ))}
        
    </div>
  );
}

export { Repository }