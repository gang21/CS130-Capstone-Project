import React, { useEffect, useRef, useState } from "react";
import { Grid2 } from "@mui/material";
import ResourceBox from "../components/ResourceBox";
import ContainerPage from "../components/ContainerPage";
import { Resource } from "@shared_types";
import ApiSdk from "../api/apiSdk";
import { useAppSelector } from "../redux/hook";
import FullScreenSpinner from "../components/FullScreenSpinner";

const ResourcePage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>();
  const hasFetched = useRef(false);
  const api = new ApiSdk();
  const { token } = useAppSelector((state) => state.session);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      api.getAllResources(token).then((resources) => {
        setResources(resources);
        console.log(resources);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!resources) return <FullScreenSpinner />;
  return (
    <ContainerPage title="Scam Resources">
      <Grid2 container spacing={2}>
        {resources.map((resource, index) => (
          <Grid2 size={6} columns={2} flexDirection="row" key={index}>
            <ResourceBox
              category={resource.category}
              content={resource.content}
              links={resource.links}
              imageUrl={resource?.imageUrl ? resource?.imageUrl : ""} // Pass the image URL prop
            />
          </Grid2>
        ))}
      </Grid2>
    </ContainerPage>
  );
};

export default ResourcePage;
