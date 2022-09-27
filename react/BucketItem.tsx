import React, { useEffect, useMemo, useState } from "react";
import { canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

interface BucketItemProps {

}

const BucketItem: StorefrontFunctionComponent<BucketItemProps> = ({ }) => {
  // const [openGate, setOpenGate] = useState(true);

  useEffect(() => {
    console.clear();

  })


  return (
    <div>Hello World</div>
  )
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
    ctaText: {
      title: "Call To Action Text",
      type: "string",
      description: "Required | Button Text."
    },
    ctaLink: {
      title: "Call To Action Link",
      type: "string",
      description: "Required | Button Link."
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