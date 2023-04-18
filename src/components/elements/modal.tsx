import { Button, Image } from '.';
import { Box, Flex, Grid } from '../layout';
import { Text } from '../typography';
import OutsideAlerter from '../outside-alerter';
import { ReactNode, useEffect, useState } from 'react';
import theme from '../../../theme';
import { css } from '@emotion/react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  children?: ReactNode;
  title?: string;
  slideFromBottomMobile?: boolean;
  removePadding?: boolean;
  hideHeader?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  onBack,
  slideFromBottomMobile,
  removePadding,
  hideHeader,
}: ModalProps) => {
  const [marginBottom, setMarginBottom] = useState('-1000px');
  const [backgroundOpacity, setBackgroundOpacity] = useState('0');
  useEffect(() => {
    if (isOpen) {
      setMarginBottom('0px');
      setBackgroundOpacity('1');
      document.body.style.overflow = 'hidden';
      // @ts-ignore
      document.getElementById('the-ultimate-modal').style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setMarginBottom('-1000px');
    setBackgroundOpacity('0');
    const timeoutId = setTimeout(() => {
      document.body.style.overflow = 'unset';
      onClose();
    }, 200);
    return () => clearTimeout(timeoutId);
  };

  return (
    <>
      {isOpen && (
        <Flex
          opacity={backgroundOpacity}
          width="100vw"
          height="100%"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          backgroundColor={theme.colors.backgroundOverlay}
          zIndex={100}
          position="fixed"
          top={0}
          left={0}
          overrideCss={css`
            transition: all 0.4s;
            backdrop-filter: blur(1px);
          `}
        >
          <OutsideAlerter callback={handleClose}>
            <Box
              overflow="hidden"
              id="the-ultimate-modal"
              dataTestId="modal"
              opacity="1"
              bottom={marginBottom}
              minHeight="250px"
              minWidth="500px"
              maxHeight="750px"
              backgroundColor="white"
              zIndex={101}
              borderRadius={theme.borderRadius.medium}
              p="30px"
              mx="10px"
              position="relative"
              overrideCss={css`
                transition: all 0.4s;
                @media ${theme.mediaQueries.mobileOnly} {
                  display: flex;
                  flex-direction: column;
                  flex: 1;
                  min-width: 250px;
                  ${!removePadding ? 'padding: 20px;' : 'padding: 20px 0;'}
                  ${slideFromBottomMobile &&
                  css`
                    margin-left: 0;
                    margin-right: 0;
                    position: absolute;
                    bottom: ${marginBottom};
                    left: 0;
                    width: 100vw;
                    border-radius: ${theme.borderRadius.small};
                    max-height: 85%;
                  `}
                }
              `}
            >
              {!hideHeader && (
                <Grid
                  gridTemplateColumns={onBack ? 'fit-content(20px) 1fr fit-content(20px)' : '1fr fit-content(20px)'}
                  mb="10px"
                  gridColumnGap="30px"
                  alignItems="center"
                >
                  {onBack && (
                    <Button
                      dataTestId="back-button"
                      onClick={() => onBack()}
                      p="10px"
                      alignItems="center"
                      borderRadius="50%"
                      overrideCss={css`
                        width: 20%;
                      `}
                    >
                      <Image source="/icons/arrow_back_ios_new-black-18dp.svg" alt="back" />
                    </Button>
                  )}
                  <Flex
                    justifyContent="center"
                    width="100%"
                    ml={!onBack ? '40px' : 0}
                    fontSize="1.3rem"
                    fontWeight="bold"
                    overrideCss={css`
                      @media ${theme.mediaQueries.mobileOnly} {
                        ${!onBack &&
                        css`
                          margin-left: 25px;
                        `}
                      }
                    `}
                  >
                    <Text
                      fontSize="1.4rem"
                      overrideCss={css`
                        @media ${theme.mediaQueries.mobileOnly} {
                          font-size: 18px;
                          text-align: center;
                        }
                      `}
                    >
                      {title}
                    </Text>
                  </Flex>
                  <Button
                    dataTestId="close-button"
                    onClick={handleClose}
                    p="4px"
                    mt="3px"
                    alignItems="center"
                    overrideCss={css`
                      @media ${theme.mediaQueries.mobileOnly} {
                        ${removePadding && 'margin-right: 20px;'}
                      }
                    `}
                  >
                    <Image
                      source="assets/icons/close.svg"
                      alt="close"
                      overrideCss={css`
                        @media ${theme.mediaQueries.mobileOnly} {
                          width: 15px;
                        }
                      `}
                    />
                  </Button>
                </Grid>
              )}
              {children}
            </Box>
          </OutsideAlerter>
        </Flex>
      )}
    </>
  );
};

export default Modal;
