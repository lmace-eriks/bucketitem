import React, { useEffect, useMemo, useRef, useState } from "react";

// Styles
import styles from "./styles.css";

interface BucketItemProps {
  desktopImage: string
  mobileImage: string
  title: string
  subtitle: string
  link: string
  altText: string
  blockClass: string
}

const BucketItem: StorefrontFunctionComponent<BucketItemProps> = ({ desktopImage, mobileImage, title, subtitle, link, altText, blockClass }) => {

  return (
    <a href={link} className={`${styles.bucketContainer}--${blockClass}`}>
      <div className={`${styles.imageContainer}--${blockClass}`}>
        <img src={mobileImage}
          srcSet={`${desktopImage} 500w, ${mobileImage} 300w`}
          sizes="(min-width: 1026px) 500px, 300px"
          loading="lazy"
          width={350} height={350}
          alt={title || altText || ""}
          className={`${styles.image}--${blockClass}`} />
      </div>
      <div className={`${styles.textContainer}--${blockClass}`}>
        {title && <div className={`${styles.title}--${blockClass}`}>{title}</div>}
        {subtitle && <div className={`${styles.subtitle}--${blockClass}`}>{subtitle}</div>}
      </div>
    </a>
  )
}

BucketItem.schema = {
  title: "Bucket Item",
  description: "",
  type: "object",
  properties: {
    desktopImage: {
      title: "Desktop Image- 500 x 500 - 250KB",
      type: "string",
      description: "Required | .jpg only | Absolute Path.",
      widget: { "ui:widget": "image-uploader" }
    },
    mobileImage: {
      title: "Mobile Image - 350 x 350 - 50KB",
      type: "string",
      widget: { "ui:widget": "image-uploader" }
    },
    altText: {
      title: "Alt Text",
      type: "string",
      description: "Required if Title and Sub Title are blank.",
      widget: { "ui:widget": "textarea" }
    },
    title: {
      title: "Title",
      type: "string",
      description: "Optional",
      widget: { "ui:widget": "textarea" }
    },
    subtitle: {
      title: "Sub Title",
      type: "string",
      description: "Optional",
      widget: { "ui:widget": "textarea" }
    },
    link: {
      title: "Link",
      type: "string",
      description: "Required | Relative or Absolute Path",
      widget: { "ui:widget": "textarea" }
    }
  }
}

export default BucketItem;