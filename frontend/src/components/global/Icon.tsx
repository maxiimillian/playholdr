import Image from 'next/image';
import Link from 'next/link';

type IconProps = {
  width: number;
  height: number;
};

export default function Icon(props: IconProps) {
  return (
    <div className="logo-container">
      <Link href="/">
        <Image
          src="/images/logo.png"
          className="logo"
          width={props.width}
          height={props.height}
          alt="website icon"
        />
      </Link>
    </div>
  );
}
