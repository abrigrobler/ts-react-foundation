/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import theme from '../../../theme';
import { Text } from '../typography';
import { Image } from '../elements';
import { Flex } from '../layout';

const DropZone = ({
  referenceFile,
  setReferenceFile,
  title,
  completed,
  dataTestId,
}: {
  referenceFile: File | null;
  setReferenceFile: (f: File) => void;
  title?: string;
  completed?: boolean;
  dataTestId?: string;
}) => {
  const [error, setError] = useState<string | null>(null);
  // const [isEditingFileName, setIsEditingFileName] = useState(false);
  // const [fileName, setFileName] = useState<string | undefined>(
  //   referenceFile?.name || undefined
  // );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    onDropRejected: () => {
      setError('Incorrect file type. Please upload a .pdf, .doc, .docx, .jpg, .jpeg or .png file.');
    },
    onDropAccepted: () => {
      setError(null);
    },
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setReferenceFile(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <Flex width="100%" justifyContent="center">
      <Flex flexDirection="column" width="100%" maxWidth="800px">
        <Text mb="15px">{title}</Text>
        <div
          id="dropzone-wrapper"
          {...getRootProps({ className: 'dropzone' })}
          css={css`
            background-color: ${referenceFile || completed ? '#E6F6E6' : '#FCF1E9'};
            border: 1px dashed ${referenceFile || completed ? '#00A300' : theme.colors.primary};
            border-radius: 4px;
            padding: 20px;
            cursor: pointer;
            position: relative;
          `}
        >
          <input {...getInputProps()} data-test-id={dataTestId || 'dropzone'} />
          <Text fontSize="16px" dataTestId={`${dataTestId}-text`}>
            {referenceFile ? 'Click to change uploaded file' : 'Click to upload or drop file'}
          </Text>
          {referenceFile || completed ? (
            <Image
              source="forms/green-tick.svg"
              alt="upload"
              height="35px"
              position="absolute"
              top="25%"
              right="20px"
            />
          ) : (
            <Image source="forms/upload.svg" alt="upload" height="20px" position="absolute" top="30%" right="20px" />
          )}
        </div>
        <Text mt="8px" color="red" maxWidth="100%" dataTestId={`${dataTestId}-error`}>
          {error}
        </Text>
        {referenceFile && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text maxWidth="90%">File: {referenceFile.name}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default DropZone;
