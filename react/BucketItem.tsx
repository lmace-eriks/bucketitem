import React, { useEffect, useMemo, useState } from "react";
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
}

const BucketItem: StorefrontFunctionComponent<BucketItemProps> = ({ desktopImage, mobileImage, title, subtitle, link, blockClass }) => {
  const [siteIsAdmin, setSiteIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mobileImageMaxSize = useMemo(() => 50000, []);

  useEffect(() => {
    if (!canUseDOM) return;

    const userIsAdmin = window.location.href.includes("siteEditor=true");

    if (userIsAdmin) {
      setSiteIsAdmin(userIsAdmin);
      getMobileImage();
    }
  });

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

  const ValidBucket = () => (
    <a href={link} className={`${styles.bucketContainer}--${blockClass}`}>
      <div className={`${styles.imageContainer}--${blockClass}`}>
        <picture>
          <source media="(min-width:1026px)" srcSet={desktopImage} />
          <source media="(max-width:1025px)" srcSet={mobileImage} />
          <img src={mobileImage} alt={`${title}.${subtitle ? " " + subtitle + "." : ""}`} loading="lazy" className={`${styles.image}--${blockClass}`} />
        </picture>
      </div>
      <div className={`${styles.textContainer}--${blockClass}`}>
        <div className={`${styles.title}--${blockClass}`}>{title}</div>
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
    mobileImage: {
      title: "Mobile Image Path",
      type: "string",
      description: "Required | .jpg only | Absolute Path."
    }
  }
}

export default BucketItem;