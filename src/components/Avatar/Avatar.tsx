import React from 'react';
import { Image, ImageStyle, View } from 'react-native';

interface Props {
  image: string | undefined;
  size: number;
  style?: ImageStyle;
  showPlaceholder?: boolean;
}

// eslint-disable-next-line operator-linebreak
const base64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE/0lEQVRogc1aXWxURRQeFUr8ISpG0OCTESEx+ICJD8akib1bEEvTomiKCRKDLQK1ITWUxJ/giz9VaDGCIaiJPBgl0ShGEIy8aaFQQKOIliqokGpppW7Blup+nu/OFu9278/s3dldT3Kyt3fOPfN9M2fOnDu3SlkQlKsb4KjFohtFd4t2iw4goS64ymt9b3fapo7P2Og7PugKdZ2Ae0L0gChiaqf4aaSv4gGfp26SjttlFM/lATxTHTUkv224R00vHPA71ETpqEk6SloDnk2Eg7JOBmmSXfBz1UxxfqRgwLOJHJawutUO+Ap1f0FHPZjEn/Jbmx/4hFoqOlp08P+R+Ft0eVzwDSUDPl4lU+UGnmFD9qUG7p2JSlVjBr5S3SIPDFoF0HA70HQXUHV5dtvCKcCrK4C2eqDm6jA/ScE2Kxz8IlVWkGxz6jhcGb0A/HAQ2LEZaH0EWHUn0PsTLsrpnigSh5jOgwk4aq118A9cr8E1lwOr7wY2NwGfbcsE7hXORHg4PekPXnbB9I5ol8BT84GRv4B7J2a3bWr0IfBYlM+k7Es3ZhNgeWAbPHXbOuDbL/3baq/RYTMmDLXwEBqbhfWZ4FmY2axtvNq5C/igPbidgBk2HHkT8JrAUEYBCF1V2gdfeQkweAZ4vs6+74Ra6SWQT0kcrEtn6NBYcrN9347ar8HLgpAbqYIQeOFhPQOcCfv+U5J4pin3TcpayFyqN61nq4H2BuDw5zpdblwOPLMAqJ+tbaz1px5S7itePk7mT5KRXgzs+xhI/uGf272SHAC++FCvCz6bH4k25b6nRhnOvQx4+j7g9dV6JOdNkLxeBrzRApztiwYdJGd/B7au0XuE20eV7oN98e/odbCTC7gn1IipjXncK98fAH7+Lj7w8XLyKHBsf+a9ox16nwgn0M0Z6A81Yt1SKvlkS9Qs9JHASKhR3y+lI9B/OmoGhqMJDPSGd9J7AmhxgAVXym8C+O1ksC3baFN9VbQthevLgEB4CO3cGt7JmopMewILEhI1taV8+pZBCCXU8VCj2mtlgXUGd8LR9NpXTw6xnWxu292lX3YMFnF0GmXaPJ/Mf1TZZmI7fN6//PZNo6YbWRABdw2k43ptpfkaCLMlARNM6Y2szsi456tgYLblx6/NCDjqQb6JTYNJMffRa8UjsGOTCQFdzKXL6c7IB1gap/4pPPhUCnh0lgmBDu8bWaPRlG1v9e90+BxQNx147yVgdCQYHNvog7Z8xk+2v2wa/yvGv1JGv9AzG3Xt8e/4/Q1A1RU69bE6ffdFyeNvauU177GNNrT1E/pmH9GxP5T1TYEr2og5S+A9b/sDYHXJ+uW5hcCy2/QeQuU177GNNn5Cn+bl9Sv5H6u0LgHOnAoOF1OhD/oy7Zen1kGfp6SxxdgRlfl8SzNw4pvcgfMZPjt+J48m0OwL3iXArzA8vsvF4Zg+Pkefuu19R+8Zfb/qDYnKa95jG21oG6cPR3WFHi26JApxuGtHeSI3MxS8Z0HX/u+O1x1VbQTeMxP1JQeuNSXgl+UE3jMTpf/ElFANscB7ZqIm/cGt2OAHcw6bQBKOmoG42Ske+C4mEyvgL5IoVxPcD92FnI2xD92LVJlV8BlEeJbqqA1WP4bQl6PWF/UfQNIF4CrRfYh3OMxnOkRXSrhMKRpwXzIJNZUHrdAF4S4hdcw97eCRjdZ+9x7baKNtp9ro+19W9F4mBKsEGgAAAABJRU5ErkJggg==';

export function Avatar({ image, size, style, showPlaceholder = true }: Props) {
  let newImage = image;
  if (!image && showPlaceholder) {
    newImage = base64;
  }

  if (!image && !showPlaceholder) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          ...style,
        }}
        testID="avatar"
      />
    );
  }
  return (
    <Image
      source={{ uri: newImage }}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        ...style,
      }}
      testID="avatar"
    />
  );
}
