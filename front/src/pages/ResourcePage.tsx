import React from "react";
import { Container, Grid2, Typography } from "@mui/material";
import ResourceBox from "../components/ResourceBox";
import ContainerPage from "../components/ContainerPage";

const resources = [
  {
    category: "Phishing",
    content:
      "Phishing scams are attempts to steal your information by pretending to be a trusted entity.",
    links: ["https://example.com/phishing", "https://example.com/protection"],
  },
  {
    category: "Fake Job Offers",
    content:
      "Fake job offers that request money or personal information are a common scam.",
    links: ["https://example.com/job-scams", "https://example.com/report"],
  },
  // Add more resources here
];

const ResourcePage: React.FC = () => {
  return (
    <ContainerPage title="Scam Resources">
      <Grid2 container spacing={3}>
        {resources.map((resource, index) => (
          <Grid2 sx={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <ResourceBox
              category={resource.category}
              content={resource.content}
              links={resource.links}
            />
          </Grid2>
        ))}
      </Grid2>
    </ContainerPage>
  );
};

export default ResourcePage;
