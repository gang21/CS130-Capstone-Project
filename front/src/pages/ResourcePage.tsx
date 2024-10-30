import React from "react";
import { Grid2 } from "@mui/material";
import ResourceBox from "../components/ResourceBox";
import ContainerPage from "../components/ContainerPage";

import imagePhyshing from "../images/physhing.webp";
import fakeJob from "../images/fake-job.jpeg";

const resources = [
  {
    category: "Phishing",
    content:
      "Phishing scams are attempts to steal your information by pretending to be a trusted entity.Phishing scams are attempts to steal your information by pretending to be a trusted entity. Phishing scams are attempts to steal your information by pretending to be a trusted entity. Phishing scams are attempts to steal your information by pretending to be a trusted entity.",
    links: ["https://example.com/phishing", "https://example.com/protection"],
    imageUrl: imagePhyshing, // Image URL
  },
  {
    category: "Fake Job Offers",
    content:
      "Fake job offers that request money or personal information are a common scam.",
    links: ["https://example.com/job-scams"],
    imageUrl: fakeJob, // Image URL
  },
  {
    category: "Fake Job Offers",
    content:
      "Fake job offers that request money or personal information are a common scam.",
    links: ["https://example.com/job-scams", "https://example.com/report"],
    imageUrl: fakeJob, // Image URL
  },
];

const ResourcePage: React.FC = () => {
  return (
    <ContainerPage title="Scam Resources">
      <Grid2 container spacing={2}>
        {resources.map((resource, index) => (
          <Grid2 size={6} columns={2} flexDirection="row" key={index}>
            <ResourceBox
              category={resource.category}
              content={resource.content}
              links={resource.links}
              imageUrl={resource.imageUrl} // Pass the image URL prop
            />
          </Grid2>
        ))}
      </Grid2>
    </ContainerPage>
  );
};

export default ResourcePage;
