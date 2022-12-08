import React, { useEffect, useMemo, useRef, useState } from "react";
import { canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

interface BucketItemProps {
  desktopImage: string
  mobileImage: string
  title: string
  subtitle: string
  link: string
  blockClass: string
  desktopWidth: number
  desktopHeight: number
  mobileWidth: number
  mobileHeight: number
}

const BucketItem: StorefrontFunctionComponent<BucketItemProps> = ({ desktopImage, mobileImage, title, subtitle, link, blockClass, desktopWidth, desktopHeight, mobileWidth, mobileHeight }) => {
  const [siteIsAdmin, setSiteIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userDevice = useRef("");

  const mobileImageMaxSize = useMemo(() => 50000, []);

  desktopWidth = desktopWidth || 500;
  desktopHeight = desktopHeight || 500;
  mobileWidth = mobileWidth || 350;
  mobileHeight = mobileHeight || 350;

  useEffect(() => {
    if (!canUseDOM) return;
    getWindowSize();
    const userIsAdmin = window.location.href.includes("siteEditor=true");

    if (userIsAdmin) {
      setSiteIsAdmin(userIsAdmin);
      getMobileImage();
    }
  });

  const getWindowSize = () => {
    if (!canUseDOM) return;

    const windowWidth = window.innerWidth;
    userDevice.current = windowWidth <= 1025 ? "mobile" : "desktop";
  }

  const bytesToKb = (b: number) => b / 1000;

  const getMobileImage = () => {
    if (!mobileImage) {
      setErrorMessage("Mobile Image Not Set.");
      return;
    }
    const tempMobileImage = new Image();
    tempMobileImage.src = mobileImage;

    const xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", mobileImage);
    xmlRequest.responseType = "blob";

    xmlRequest.onload = () => {
      const blob = xmlRequest.response;
      verifyMobileImage(blob.size);
    }
    xmlRequest.send();
  }

  const verifyMobileImage = (imageSize: number) => {
    const fileSizePassed = imageSize <= mobileImageMaxSize;

    // Mobile Image file size is not too large
    if (!fileSizePassed) {
      setErrorMessage(`Mobile Image File Size Too Large. Maximum is ${bytesToKb(mobileImageMaxSize)} Kb. Image provided is ${bytesToKb(imageSize)} Kb.`);
      return;
    }

    setErrorMessage("");
  }

  const imageSize = (dim: string) => {
    return "" + userDevice.current === "mobile" ? dim === "w" ? mobileWidth : mobileHeight : dim === "w" ? desktopWidth : desktopHeight;
  }

  const ValidBucket = () => (
    <a href={link} className={`${styles.bucketContainer}--${blockClass}`}>
      <div className={`${styles.imageContainer}--${blockClass}`}>
        <picture>
          {/* @ts-expect-error -- width and height do not appear in the definition for <source> yet - LM */}
          <source media="(min-width:1026px)" srcSet={desktopImage} width={imageSize("w")} height={imageSize("h")} />
          {/* @ts-expect-error */}
          <source media="(max-width:1025px)" srcSet={mobileImage} width={imageSize("w")} height={imageSize("h")} />
          <img src={mobileImage} alt={`${title}.${subtitle ? " " + subtitle + "." : ""}`} loading="lazy" className={`${styles.image}--${blockClass}`} width={imageSize("w")} height={imageSize("h")} />
        </picture>
      </div>
      <div className={`${styles.textContainer}--${blockClass}`}>
        {title && <div className={`${styles.title}--${blockClass}`}>{title}</div>}
        {subtitle && <div className={`${styles.subtitle}--${blockClass}`}>{subtitle}</div>}
      </div>
    </a>
  )

  const ErrorMessage = () => (
    <div className={styles.errorMessage}>{errorMessage}</div>
  )

  return !siteIsAdmin ? <ValidBucket /> : errorMessage ? <ErrorMessage /> : <ValidBucket />
}

BucketItem.schema = {
  title: "Bucket Item",
  description: "",
  type: "object",
  properties: {
    title: {
      title: "Title",
      type: "string",
      description: "Required | Title Text."
    },
    subtitle: {
      title: "Sub Title",
      type: "string",
      description: "Optional | Sub Title Text."
    },
    link: {
      title: "Link",
      type: "string",
      description: "Required | Relative or Absolute Path"
    },
    desktopImage: {
      title: "Desktop Image Path",
      type: "string",
      description: "Required | .jpg only | Absolute Path."
    },
    desktopWidth: {
      title: "Desktop Image Width",
      type: "number",
      description: "",
      default: 500
    },
    desktopHeight: {
      title: "Desktop Image Height",
      type: "number",
      description: "",
      default: 500
    },
    mobileImage: {
      title: "Mobile Image Path",
      type: "string",
      description: "Required | .jpg only | Absolute Path."
    },
    mobileWidth: {
      title: "Mobile Image Width",
      type: "number",
      description: "",
      default: 350
    },
    mobileHeight: {
      title: "Mobile Image Height",
      type: "number",
      description: "",
      default: 350
    }
  }
}

export default BucketItem;