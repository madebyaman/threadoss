export default function Logo({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 173 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="#E0E7FF" />
      <path
        d="M11.5426 28.1555V28.1555C11.7038 28.1555 11.8647 28.1411 12.0233 28.1125L14.4501 27.6749C15.6615 27.4346 16.7518 26.8339 17.5998 25.9929L28.624 15.1801C29.3508 14.5793 29.7143 13.6182 29.7143 12.6571C29.7143 11.6959 29.3508 10.8549 28.624 10.1341C27.2914 8.81249 24.9896 8.81249 23.5359 10.1341L12.5117 20.8268C11.6637 21.6678 11.058 22.749 10.8157 23.9505L10.4225 26.1927C10.3617 26.5396 10.2333 26.8765 10.31 27.2202V27.2202C10.4105 27.6699 10.8354 28.0434 11.2875 28.1323C11.3661 28.1477 11.4504 28.1555 11.5426 28.1555ZM25.2319 11.9362C25.4742 11.6959 25.8376 11.5758 26.0799 11.5758C26.4434 11.5758 26.6857 11.6959 26.928 11.9362C27.1702 12.1765 27.2914 12.4168 27.2914 12.6571C27.2914 12.7772 27.2914 13.1376 26.928 13.4981V13.4981C26.6568 13.7669 26.2222 13.775 25.9413 13.5163L25.2494 12.8791C24.9759 12.6272 24.9679 12.198 25.2319 11.9362V11.9362ZM13.2386 24.5512C13.3598 23.8303 13.7232 23.2296 14.3289 22.6289L22.2702 14.8627C22.7081 14.4345 23.4045 14.424 23.855 14.8389V14.8389C24.3401 15.2856 24.3515 16.0477 23.8801 16.5088L16.0249 24.1908C15.5404 24.6713 14.8135 25.0318 14.0866 25.1519L13.9422 25.1877C13.5482 25.2854 13.1807 24.9529 13.2386 24.5512V24.5512ZM28.5028 29.5972H11.5426C10.8157 29.5972 10.3311 30.0777 10.3311 30.7986C10.3311 31.5195 10.8157 32 11.5426 32H28.5028C29.2297 32 29.7143 31.5195 29.7143 30.7986C29.7143 30.0777 29.2297 29.5972 28.5028 29.5972Z"
        fill="#4338CA"
      />
      <path
        d="M57.7656 30H54.1328V15.8906H49.4805V12.8672H62.418V15.8906H57.7656V30ZM68.3477 11.7656V15.4805C68.3477 16.1289 68.3242 16.7461 68.2773 17.332C68.2383 17.918 68.207 18.332 68.1836 18.5742H68.3711C68.6523 18.1211 68.9844 17.7539 69.3672 17.4727C69.7578 17.1914 70.1875 16.9844 70.6562 16.8516C71.125 16.7188 71.6289 16.6523 72.168 16.6523C73.1133 16.6523 73.9375 16.8203 74.6406 17.1562C75.3438 17.4844 75.8906 18.0039 76.2812 18.7148C76.6719 19.418 76.8672 20.332 76.8672 21.457V30H73.293V22.3477C73.293 21.4102 73.1211 20.7031 72.7773 20.2266C72.4336 19.75 71.9023 19.5117 71.1836 19.5117C70.4648 19.5117 69.8984 19.6797 69.4844 20.0156C69.0703 20.3438 68.7773 20.832 68.6055 21.4805C68.4336 22.1211 68.3477 22.9062 68.3477 23.8359V30H64.7734V11.7656H68.3477ZM87.8594 16.6523C88.0391 16.6523 88.2461 16.6641 88.4805 16.6875C88.7227 16.7031 88.918 16.7266 89.0664 16.7578L88.7969 20.1094C88.6797 20.0703 88.5117 20.043 88.293 20.0273C88.082 20.0039 87.8984 19.9922 87.7422 19.9922C87.2812 19.9922 86.832 20.0508 86.3945 20.168C85.9648 20.2852 85.5781 20.4766 85.2344 20.7422C84.8906 21 84.6172 21.3438 84.4141 21.7734C84.2188 22.1953 84.1211 22.7148 84.1211 23.332V30H80.5469V16.8984H83.2539L83.7812 19.1016H83.957C84.2148 18.6562 84.5352 18.25 84.918 17.8828C85.3086 17.5078 85.75 17.2109 86.2422 16.9922C86.7422 16.7656 87.2812 16.6523 87.8594 16.6523ZM96.8477 16.6523C98.0586 16.6523 99.1016 16.8867 99.9766 17.3555C100.852 17.8164 101.527 18.4883 102.004 19.3711C102.48 20.2539 102.719 21.332 102.719 22.6055V24.3398H94.2695C94.3086 25.3477 94.6094 26.1406 95.1719 26.7188C95.7422 27.2891 96.5312 27.5742 97.5391 27.5742C98.375 27.5742 99.1406 27.4883 99.8359 27.3164C100.531 27.1445 101.246 26.8867 101.98 26.543V29.3086C101.332 29.6289 100.652 29.8633 99.9414 30.0117C99.2383 30.1602 98.3828 30.2344 97.375 30.2344C96.0625 30.2344 94.8984 29.9922 93.8828 29.5078C92.875 29.0234 92.082 28.2852 91.5039 27.293C90.9336 26.3008 90.6484 25.0508 90.6484 23.543C90.6484 22.0117 90.9062 20.7383 91.4219 19.7227C91.9453 18.6992 92.6719 17.9336 93.6016 17.4258C94.5312 16.9102 95.6133 16.6523 96.8477 16.6523ZM96.8711 19.1953C96.1758 19.1953 95.5977 19.418 95.1367 19.8633C94.6836 20.3086 94.4219 21.0078 94.3516 21.9609H99.3672C99.3594 21.4297 99.2617 20.957 99.0742 20.543C98.8945 20.1289 98.6211 19.8008 98.2539 19.5586C97.8945 19.3164 97.4336 19.1953 96.8711 19.1953ZM110.992 16.6289C112.75 16.6289 114.098 17.0117 115.035 17.7773C115.973 18.543 116.441 19.707 116.441 21.2695V30H113.945L113.254 28.2188H113.16C112.785 28.6875 112.402 29.0703 112.012 29.3672C111.621 29.6641 111.172 29.8828 110.664 30.0234C110.156 30.1641 109.539 30.2344 108.812 30.2344C108.039 30.2344 107.344 30.0859 106.727 29.7891C106.117 29.4922 105.637 29.0391 105.285 28.4297C104.934 27.8125 104.758 27.0312 104.758 26.0859C104.758 24.6953 105.246 23.6719 106.223 23.0156C107.199 22.3516 108.664 21.9844 110.617 21.9141L112.891 21.8438V21.2695C112.891 20.582 112.711 20.0781 112.352 19.7578C111.992 19.4375 111.492 19.2773 110.852 19.2773C110.219 19.2773 109.598 19.3672 108.988 19.5469C108.379 19.7266 107.77 19.9531 107.16 20.2266L105.977 17.8125C106.672 17.4453 107.449 17.1562 108.309 16.9453C109.176 16.7344 110.07 16.6289 110.992 16.6289ZM112.891 23.9297L111.508 23.9766C110.352 24.0078 109.547 24.2148 109.094 24.5977C108.648 24.9805 108.426 25.4844 108.426 26.1094C108.426 26.6562 108.586 27.0469 108.906 27.2812C109.227 27.5078 109.645 27.6211 110.16 27.6211C110.926 27.6211 111.57 27.3945 112.094 26.9414C112.625 26.4883 112.891 25.8438 112.891 25.0078V23.9297ZM124.281 30.2344C122.82 30.2344 121.629 29.6641 120.707 28.5234C119.793 27.375 119.336 25.6914 119.336 23.4727C119.336 21.2305 119.801 19.5352 120.73 18.3867C121.66 17.2305 122.875 16.6523 124.375 16.6523C125 16.6523 125.551 16.7383 126.027 16.9102C126.504 17.082 126.914 17.3125 127.258 17.6016C127.609 17.8906 127.906 18.2148 128.148 18.5742H128.266C128.219 18.3242 128.16 17.957 128.09 17.4727C128.027 16.9805 127.996 16.4766 127.996 15.9609V11.7656H131.582V30H128.84L128.148 28.3008H127.996C127.77 28.6602 127.484 28.9883 127.141 29.2852C126.805 29.5742 126.402 29.8047 125.934 29.9766C125.465 30.1484 124.914 30.2344 124.281 30.2344ZM125.535 27.3867C126.512 27.3867 127.199 27.0977 127.598 26.5195C128.004 25.9336 128.219 25.0547 128.242 23.8828V23.4961C128.242 22.2227 128.047 21.25 127.656 20.5781C127.266 19.8984 126.539 19.5586 125.477 19.5586C124.688 19.5586 124.07 19.8984 123.625 20.5781C123.18 21.2578 122.957 22.2383 122.957 23.5195C122.957 24.8008 123.18 25.7656 123.625 26.4141C124.078 27.0625 124.715 27.3867 125.535 27.3867ZM147.227 23.4258C147.227 24.5195 147.078 25.4883 146.781 26.332C146.492 27.1758 146.066 27.8906 145.504 28.4766C144.949 29.0547 144.277 29.4922 143.488 29.7891C142.707 30.0859 141.824 30.2344 140.84 30.2344C139.918 30.2344 139.07 30.0859 138.297 29.7891C137.531 29.4922 136.863 29.0547 136.293 28.4766C135.73 27.8906 135.293 27.1758 134.98 26.332C134.676 25.4883 134.523 24.5195 134.523 23.4258C134.523 21.9727 134.781 20.7422 135.297 19.7344C135.812 18.7266 136.547 17.9609 137.5 17.4375C138.453 16.9141 139.59 16.6523 140.91 16.6523C142.137 16.6523 143.223 16.9141 144.168 17.4375C145.121 17.9609 145.867 18.7266 146.406 19.7344C146.953 20.7422 147.227 21.9727 147.227 23.4258ZM138.168 23.4258C138.168 24.2852 138.262 25.0078 138.449 25.5938C138.637 26.1797 138.93 26.6211 139.328 26.918C139.727 27.2148 140.246 27.3633 140.887 27.3633C141.52 27.3633 142.031 27.2148 142.422 26.918C142.82 26.6211 143.109 26.1797 143.289 25.5938C143.477 25.0078 143.57 24.2852 143.57 23.4258C143.57 22.5586 143.477 21.8398 143.289 21.2695C143.109 20.6914 142.82 20.2578 142.422 19.9688C142.023 19.6797 141.504 19.5352 140.863 19.5352C139.918 19.5352 139.23 19.8594 138.801 20.5078C138.379 21.1562 138.168 22.1289 138.168 23.4258ZM159.32 26.1094C159.32 27 159.109 27.7539 158.688 28.3711C158.273 28.9805 157.652 29.4453 156.824 29.7656C155.996 30.0781 154.965 30.2344 153.73 30.2344C152.816 30.2344 152.031 30.1758 151.375 30.0586C150.727 29.9414 150.07 29.7461 149.406 29.4727V26.5195C150.117 26.8398 150.879 27.1055 151.691 27.3164C152.512 27.5195 153.23 27.6211 153.848 27.6211C154.543 27.6211 155.039 27.5195 155.336 27.3164C155.641 27.1055 155.793 26.832 155.793 26.4961C155.793 26.2773 155.73 26.082 155.605 25.9102C155.488 25.7305 155.23 25.5312 154.832 25.3125C154.434 25.0859 153.809 24.793 152.957 24.4336C152.137 24.0898 151.461 23.7422 150.93 23.3906C150.406 23.0391 150.016 22.625 149.758 22.1484C149.508 21.6641 149.383 21.0508 149.383 20.3086C149.383 19.0977 149.852 18.1875 150.789 17.5781C151.734 16.9609 152.996 16.6523 154.574 16.6523C155.387 16.6523 156.16 16.7344 156.895 16.8984C157.637 17.0625 158.398 17.3242 159.18 17.6836L158.102 20.2617C157.453 19.9805 156.84 19.75 156.262 19.5703C155.691 19.3906 155.109 19.3008 154.516 19.3008C153.992 19.3008 153.598 19.3711 153.332 19.5117C153.066 19.6523 152.934 19.8672 152.934 20.1562C152.934 20.3672 153 20.5547 153.133 20.7188C153.273 20.8828 153.539 21.0664 153.93 21.2695C154.328 21.4648 154.91 21.7188 155.676 22.0312C156.418 22.3359 157.062 22.6562 157.609 22.9922C158.156 23.3203 158.578 23.7305 158.875 24.2227C159.172 24.707 159.32 25.3359 159.32 26.1094ZM171.25 26.1094C171.25 27 171.039 27.7539 170.617 28.3711C170.203 28.9805 169.582 29.4453 168.754 29.7656C167.926 30.0781 166.895 30.2344 165.66 30.2344C164.746 30.2344 163.961 30.1758 163.305 30.0586C162.656 29.9414 162 29.7461 161.336 29.4727V26.5195C162.047 26.8398 162.809 27.1055 163.621 27.3164C164.441 27.5195 165.16 27.6211 165.777 27.6211C166.473 27.6211 166.969 27.5195 167.266 27.3164C167.57 27.1055 167.723 26.832 167.723 26.4961C167.723 26.2773 167.66 26.082 167.535 25.9102C167.418 25.7305 167.16 25.5312 166.762 25.3125C166.363 25.0859 165.738 24.793 164.887 24.4336C164.066 24.0898 163.391 23.7422 162.859 23.3906C162.336 23.0391 161.945 22.625 161.688 22.1484C161.438 21.6641 161.312 21.0508 161.312 20.3086C161.312 19.0977 161.781 18.1875 162.719 17.5781C163.664 16.9609 164.926 16.6523 166.504 16.6523C167.316 16.6523 168.09 16.7344 168.824 16.8984C169.566 17.0625 170.328 17.3242 171.109 17.6836L170.031 20.2617C169.383 19.9805 168.77 19.75 168.191 19.5703C167.621 19.3906 167.039 19.3008 166.445 19.3008C165.922 19.3008 165.527 19.3711 165.262 19.5117C164.996 19.6523 164.863 19.8672 164.863 20.1562C164.863 20.3672 164.93 20.5547 165.062 20.7188C165.203 20.8828 165.469 21.0664 165.859 21.2695C166.258 21.4648 166.84 21.7188 167.605 22.0312C168.348 22.3359 168.992 22.6562 169.539 22.9922C170.086 23.3203 170.508 23.7305 170.805 24.2227C171.102 24.707 171.25 25.3359 171.25 26.1094Z"
        fill="black"
      />
    </svg>
  );
}
