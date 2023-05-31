import React from "react";
import { Link } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

interface BucketItemProps {
  desktopImage: string
  mobileImage: string
  title: string
  subtitle: string
  link: string
  altText: string
  loadingPriority: boolean
  blockClass: string
}

const BucketItem: StorefrontFunctionComponent<BucketItemProps> = ({ desktopImage, mobileImage, title, subtitle, link, altText, loadingPriority, blockClass }) => {

  return (
    <Link href={link} className={`${styles.bucketContainer}--${blockClass}`}>
      <div className={`${styles.imageContainer}--${blockClass}`}>
        <img src={mobileImage}
          srcSet={`${desktopImage} 500w, ${mobileImage} 300w`}
          sizes="(min-width: 1026px) 500px, 300px"
          loading={loadingPriority ? "eager" : "lazy"}
          // @ts-expect-error
          fetchPriority={loadingPriority ? "high" : "low"}
          width={350} height={350}
          alt={title || altText || ""}
          className={`${styles.image}--${blockClass}`} />
      </div>
      <div className={`${styles.textContainer}--${blockClass}`}>
        {title && <div className={`${styles.title}--${blockClass}`}>{title}</div>}
        {subtitle && <div className={`${styles.subtitle}--${blockClass}`}>{subtitle}</div>}
      </div>
    </Link>
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
    },
    loadingPriority: {
      title: "Loading Priority",
      type: "boolean"
    }
  }
}

export default BucketItem;
