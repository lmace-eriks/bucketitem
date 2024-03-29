import React from "react";
import { Link } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}

interface BucketItemProps {
  desktopImage: string
  mobileImage: string
  title: string
  subtitle: string
  link: string
  altText: string
  loadingPriority: boolean
  linkAriaLabel: string
  blockClass: string
}

const BucketItem: StorefrontFunctionComponent<BucketItemProps> = ({ desktopImage, mobileImage, title, subtitle, link, altText, loadingPriority, linkAriaLabel, blockClass }) => {
  const externalLink = link.includes("http");

  const Bucket = () => (
    <>
      <div className={`${styles.imageContainer}--${blockClass}`}>
        <img src={mobileImage}
          srcSet={`${desktopImage} 500w, ${mobileImage} 300w`}
          sizes="(min-width: 1026px) 500px, 300px"
          loading={loadingPriority ? "eager" : "lazy"}
          fetchPriority={loadingPriority ? "high" : "low"}
          width={350} height={350}
          alt={altText || title || ""}
          className={`${styles.image}--${blockClass}`} />
      </div>
      <div className={`${styles.textContainer}--${blockClass}`}>
        {title &&
          <div className={`${styles.title}--${blockClass}`}>
            {title}
          </div>}
        {subtitle &&
          <div className={`${styles.subtitle}--${blockClass}`}>
            {subtitle}
          </div>}
      </div>
    </>
  )

  if (externalLink) {
    return (
      <Link href={link} aria-label={linkAriaLabel} className={`${styles.bucketContainer}--${blockClass}`}>
        <Bucket />
      </Link>
    )
  } else {
    return (
      <Link to={link} aria-label={linkAriaLabel} className={`${styles.bucketContainer}--${blockClass}`}>
        <Bucket />
      </Link>
    )
  }
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
    linkAriaLabel: {
      title: "Link Description for Screen Readers",
      type: "string",
      description: "Required if Title and Sub Title are blank.",
      default: "",
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
    altText: {
      title: "Image Alt Text",
      type: "string",
      description: "",
      widget: { "ui:widget": "textarea" }
    },
    loadingPriority: {
      title: "Loading Priority",
      type: "boolean"
    }
  }
}

export default BucketItem;
