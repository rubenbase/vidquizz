import React from 'react'

import styles from './ComposeBuffToVideo.module.scss'

const SIDE_STYLES = {
  right: 'bottom-0 right-0 mr-7',
  left: 'bottom-0 left-0 ml-7',
}

interface ComposeBuffToVideoProps {
  videoUrl: string
  side: string
  children: React.ReactNode
}

const ComposeBuffToVideo = React.forwardRef<HTMLVideoElement, ComposeBuffToVideoProps>(
  ({ videoUrl, side = 'left', children }, ref) => {
    return (
      <div className="relative">
        <div className={`absolute ${styles.overlay}`}>
          <div className={`absolute ${SIDE_STYLES[side]}`}>{children}</div>
        </div>
        <video ref={ref} className="w-full h-auto" id="buffVideo" controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
        <span>
          I mocked the 1st answer to be the correct since I didn't see that data in the
          response
        </span>
      </div>
    )
  }
)

export default ComposeBuffToVideo
