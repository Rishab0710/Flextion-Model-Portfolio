import { SVGProps } from 'react';

export function FlextionXLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.34277 7.75735L12 2L17.6569 7.75735L12 13.4142L6.34277 7.75735Z"
        fill="#4CAF50"
      />
      <path
        d="M2 12L7.75735 17.6569L13.4142 12L7.75735 6.34277L2 12Z"
        fill="#2196F3"
      />
      <path
        d="M10.5858 12L16.2426 17.6569L22 12L16.2426 6.34277L10.5858 12Z"
        fill="#FFC107"
      />
      <path
        d="M6.34277 16.2426L12 22L17.6569 16.2426L12 10.5858L6.34277 16.2426Z"
        fill="#F44336"
      />
    </svg>
  );
}
