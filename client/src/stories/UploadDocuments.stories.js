import React from "react";
import tw, { css } from "twin.macro";
import Modal from "../common/components/Modal/Modal";
import UploadDocuments from "../common/components/UploadDocuments";
import ViewDocuments from "../common/components/ViewDocuments";

export default {
  title: 'Example/UploadDocuments',
};

export const Upload = () => <UploadDocuments />;
export const View = () => <ViewDocuments />;
export const modal = () => <Modal width="508px"
                                  paddingBottom="80px"
                                  titleFontSize="24px"
                                  component = {
                                                <button>
                                                  Upload
                                                </button>
                                              }
                                  title="Upload Documents"
                                  children={<UploadDocuments key={Math.random()} />}
                            />