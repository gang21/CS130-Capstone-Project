import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

interface ResourceBoxProps {
  category: string;
  content: string;
  links: string[];
}

const ResourceBox: React.FC<ResourceBoxProps> = ({
  category,
  content,
  links,
}) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Chip label={category} color="primary" sx={{ mb: 2 }} />
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
        <List>
          {links.map((link, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon>
                <LinkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  color="secondary"
                >
                  {link}
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ResourceBox;
