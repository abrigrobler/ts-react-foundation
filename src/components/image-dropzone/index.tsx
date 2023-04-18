/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import theme from '../../../theme';
import { Text } from '../typography';
import { Image } from '../elements';
import { Flex } from '../layout';

const ImageDropZone = ({
  image,
  setImage,
  label,
  dataTestId,
}: {
  image: File | null;
  setImage: (f: File) => void;
  label?: string;
  dataTestId?: string;
}) => {
  const [error, setError] = useState<string | null>(null);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    onDropRejected: () => {
      setError('Incorrect file type. Please upload a jpg, .jpeg or .png file.');
    },
    onDropAccepted: () => {
      setError(null);
    },
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <Flex width="100%" justifyContent="center">
      <Flex flexDirection="column" width="100%" maxWidth="800px">
        <Flex>
          <Text mb="15px" fontWeight="bold" fontSize="16px">
            {label}
          </Text>
          {image && (
            <Text fontSize="12px" color={theme.colors.lightGrey} ml="10px" mt="2px">
              (click the image to edit)
            </Text>
          )}
        </Flex>
        <div
          id="dropzone-wrapper"
          {...getRootProps({ className: 'dropzone' })}
          css={css`
            cursor: pointer;
            position: relative;
          `}
        >
          <input {...getInputProps()} data-test-id={dataTestId || 'dropzone'} />
          <Flex
            justifyContent="center"
            alignItems="center"
            height="155px"
            width="100%"
            border={theme.borders.standard1px}
            borderRadius="4px"
          >
            {image ? (
              <Image
                source={URL.createObjectURL(image)}
                alt="camera"
                height="100%"
                width="100%"
                objectFit="contain"
                m="10px"
              />
            ) : (
              <Image source="icons/camera.svg" alt="camera" height="60px" />
            )}
          </Flex>
        </div>
        <Text mt="8px" color="red" maxWidth="100%" dataTestId={`${dataTestId}-error`}>
          {error}
        </Text>
        {image && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text maxWidth="90%">Image: {image.name}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ImageDropZone;
