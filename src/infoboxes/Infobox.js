import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Infobox.css";

export default function InfoBox({ title, cases, total }) {
  return (
    <Card className="info_box_card">
      <CardContent>
        <Typography className="info_box_cases">
          <strong>{title}</strong>
        </Typography>
        <Typography className="info_box_cases">
          <strong>{cases}</strong>
        </Typography>
        <Typography className="info_box_cases">
          <strong> {total}Total</strong>
        </Typography>
      </CardContent>
    </Card>
  );
}
