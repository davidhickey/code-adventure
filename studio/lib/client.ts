import { createClient, type ClientConfig } from "@sanity/client";
import { dataset, projectId, apiVersion } from "./api";

const config: ClientConfig = {
  projectId: projectId || "",
  dataset: dataset || "",
  apiVersion: apiVersion || "",
  useCdn: false,
};

const client = createClient(config);

export default client;