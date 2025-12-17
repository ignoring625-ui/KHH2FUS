import svgPaths from "./svg-jpg8m5swvb";
import clsx from "clsx";

function Wrapper4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[28px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        {children}
      </svg>
    </div>
  );
}
type Wrapper3Props = {
  additionalClassNames?: string;
  text: string;
  additionalClassNames1?: string;
};

function Wrapper3({ children, additionalClassNames = "", text, additionalClassNames1 = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={clsx("relative rounded-[8px] shrink-0 w-full", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className={clsx("content-stretch flex flex-col items-center justify-center px-[12px] py-[10px] relative", additionalClassNames)}>
          <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col items-center size-full">
      <div className="content-stretch flex flex-col gap-[4px] items-center p-[4px] relative w-full">{children}</div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">{children}</div>
    </div>
  );
}
type Tab1Props = {
  additionalClassNames?: string;
};

function Tab1({ children, additionalClassNames = "" }: React.PropsWithChildren<Tab1Props>) {
  return (
    <div className={clsx("basis-0 grow min-h-px min-w-px relative rounded-[12px] shrink-0", additionalClassNames)}>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[12px] py-[8px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function Card({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper additionalClassNames="bg-[rgba(0,0,0,0.05)] rounded-[6px]">
      <div className="content-stretch flex flex-col gap-[8px] items-center justify-center p-[12px] relative w-full">{children}</div>
    </Wrapper>
  );
}

function Tab({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[6px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Wrapper1>{children}</Wrapper1>
    </div>
  );
}

function Helper2() {
  return (
    <div className="h-0 relative shrink-0 w-[336px]">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 336 1">
          <path d="M0 0.5H336" id="Vector 200" stroke="var(--stroke-0, black)" strokeOpacity="0.1" />
        </svg>
      </div>
    </div>
  );
}

function MynauiEdit() {
  return (
    <Wrapper2>
      <g id="mynaui:edit">
        <path d={svgPaths.p5d7e600} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Wrapper2>
  );
}
type AvatarTextProps = {
  text: string;
};

function AvatarText({ text }: AvatarTextProps) {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
      <p className="[white-space-collapse:collapse] basis-0 font-['Roboto:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}
type Helper1Props = {
  text: string;
  text1: string;
};

function Helper1({ text, text1 }: Helper1Props) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <p className="[white-space-collapse:collapse] font-['Roboto:Medium',sans-serif] font-medium leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-black text-nowrap w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text1}
      </p>
    </div>
  );
}
type ImageAndTextProps = {
  text: string;
};

function ImageAndText({ text }: ImageAndTextProps) {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0.05)] grow h-full min-h-px min-w-px overflow-clip relative rounded-[6px] shrink-0">
      <div className="absolute left-1/2 size-[336px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 336 336">
          <g clipPath="url(#clip0_4_659)" id="image">
            <path d={svgPaths.p1a7ce000} fill="var(--fill-0, #D9D9D9)" id="Ellipse 98" />
            <path clipRule="evenodd" d={svgPaths.p27357e00} fill="var(--fill-0, white)" fillRule="evenodd" id="Union" />
          </g>
          <defs>
            <clipPath id="clip0_4_659">
              <rect fill="white" height="336" width="336" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[22px] left-[16px] right-[16px] text-[16px] text-black text-center top-[calc(50%+8px)]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
      <div className="absolute left-1/2 size-[24px] top-[calc(50%-12px)] translate-x-[-50%] translate-y-[-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="ic-location">
            <path clipRule="evenodd" d={svgPaths.pebbcb00} fill="var(--fill-0, black)" fillOpacity="0.3" fillRule="evenodd" id="shape" />
          </g>
        </svg>
      </div>
    </div>
  );
}
type IconButtonsTextProps = {
  text: string;
};

function IconButtonsText({ text }: IconButtonsTextProps) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 size-[24px] text-[16px] text-black text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="[white-space-collapse:collapse] leading-[24px] overflow-ellipsis overflow-hidden">{text}</p>
      </div>
    </div>
  );
}
type LabelNormalTextProps = {
  text: string;
};

function LabelNormalText({ text }: LabelNormalTextProps) {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] relative rounded-[2px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit]">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          {text}
        </p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}
type HelperProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function Helper({ text, text1, additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("content-stretch flex flex-col gap-[4px] items-start p-[12px] relative text-nowrap w-full", additionalClassNames)}>
      <p className="[white-space-collapse:collapse] font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[28px] overflow-ellipsis overflow-hidden relative shrink-0 text-[20px] text-black whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text1}
      </p>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-normal justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] text-center text-nowrap w-full", additionalClassNames)}>
      <p className="[white-space-collapse:collapse] leading-[14px] overflow-ellipsis overflow-hidden">{text}</p>
    </div>
  );
}
type FrameTextProps = {
  text: string;
  additionalClassNames?: string;
};

function FrameText({ text, additionalClassNames = "" }: FrameTextProps) {
  return (
    <div className={clsx("relative rounded-[24px] shrink-0 size-[48px]", additionalClassNames)}>
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-1/2 overflow-ellipsis overflow-hidden size-[48px] text-[30px] text-black text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="[white-space-collapse:collapse] leading-[48px] overflow-ellipsis overflow-hidden">{text}</p>
      </div>
    </div>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <p className="font-['Roboto:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <div className="flex h-[60px] items-center justify-center relative shrink-0 w-[80px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-[80px] relative w-[60px]" data-name="Regular">
            <div className="absolute inset-[0_-6.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 68 80">
                <g id="Regular">
                  <path d="M6.46083 40L61.5 40" id="Line" stroke="var(--stroke-0, #111111)" strokeDasharray="4 4" strokeLinecap="round" strokeWidth="1.5" />
                  <g id="Arrow">
                    <path d={svgPaths.p224bce80} fill="var(--fill-0, #111111)" id="Arrow_2" />
                  </g>
                  <g id="Circle">
                    <path d={svgPaths.p7d4eb00} fill="var(--fill-0, #111111)" id="Circle_2" stroke="var(--stroke-0, #111111)" strokeWidth="3" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-black text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px] whitespace-pre">2 hr</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12px] items-center pb-[80px] pt-0 px-0 relative size-full" data-name="Page">
      <div className="bg-white content-stretch flex flex-col items-start relative shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)] shrink-0 w-full" data-name="Top Bar">
        <div className="bg-white h-[24px] relative shrink-0 w-full" data-name="top">
          <div className="absolute h-[10.227px] right-[8.72px] top-[calc(50%+0.02px)] translate-y-[-50%] w-[33.64px]" data-name="time">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 11">
              <g id="time">
                <path d={svgPaths.p13a21a00} fill="var(--fill-0, black)" fillOpacity="0.7" />
                <path d={svgPaths.pfaefa80} fill="var(--fill-0, black)" fillOpacity="0.7" />
                <path d={svgPaths.p27edf200} fill="var(--fill-0, black)" fillOpacity="0.7" />
                <path d={svgPaths.p1105e700} fill="var(--fill-0, black)" fillOpacity="0.7" />
                <path d={svgPaths.p10f6cf00} fill="var(--fill-0, black)" fillOpacity="0.7" />
              </g>
            </svg>
          </div>
          <div className="absolute h-[14px] right-[51px] top-1/2 translate-y-[-50%] w-[9px]" data-name="battery">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
              <path clipRule="evenodd" d={svgPaths.p11a2ad80} fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" id="battery" />
            </svg>
          </div>
          <div className="absolute right-[69px] size-[14px] top-1/2 translate-y-[-50%]" data-name="cellular">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path clipRule="evenodd" d="M0 14H14V0L0 14Z" fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" id="cellular" />
            </svg>
          </div>
          <div className="absolute h-[14px] right-[84.98px] top-1/2 translate-y-[-50%] w-[18.045px]" data-name="wifi">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 14">
              <path d={svgPaths.p17036780} fill="var(--fill-0, black)" fillOpacity="0.7" id="wifi" />
            </svg>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="content">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center pl-[16px] pr-[8px] py-[12px] relative w-full">
              <p className="basis-0 font-['Roboto:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium grow leading-[24px] min-h-px min-w-px relative shrink-0 text-[20px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                行程
              </p>
              <div className="content-stretch flex items-center p-[4px] relative shrink-0">
                <Wrapper2>
                  <g id="ic-search">
                    <path clipRule="evenodd" d={svgPaths.p401e00} fill="var(--fill-0, black)" fillRule="evenodd" id="shape" />
                  </g>
                </Wrapper2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Wrapper>
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-center px-[12px] py-0 relative w-full">
          <div className="content-stretch flex items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="section title">
            <TextText text="行程日期" />
          </div>
          <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="tab group">
            <div className="basis-0 bg-black grow min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="tab">
              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.75)] border-solid inset-0 pointer-events-none rounded-[6px]" />
              <Wrapper1>
                <FrameText text="06" additionalClassNames="bg-[rgba(255,255,255,0.75)]" />
                <Text text="星期五" additionalClassNames="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] h-[28px] text-white" />
              </Wrapper1>
            </div>
            <Tab>
              <FrameText text="07" additionalClassNames="bg-[rgba(0,0,0,0.05)]" />
              <Text text="星期六" additionalClassNames="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] h-[28px] text-black" />
            </Tab>
            <Tab>
              <FrameText text="08" additionalClassNames="bg-[rgba(0,0,0,0.05)]" />
              <Text text="星期日" additionalClassNames="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] h-[28px] text-black" />
            </Tab>
            <Tab>
              <FrameText text="09" additionalClassNames="bg-[rgba(0,0,0,0.05)]" />
              <Text text="星期一" additionalClassNames="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] h-[28px] text-black" />
            </Tab>
          </div>
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="row">
            <div className="basis-0 grow min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="metric">
              <div className="overflow-clip rounded-[inherit] size-full">
                <Helper text="景點數量" text1="3" />
              </div>
              <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
            </div>
            <div className="relative rounded-[6px] shrink-0 w-[150px]" data-name="metric">
              <Helper text="當日已知花費" text1="$1200" additionalClassNames="overflow-clip rounded-[inherit]" />
              <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
            </div>
          </div>
        </div>
      </Wrapper>
      <div className="relative shrink-0 w-full" data-name="list">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[12px] py-0 relative w-full">
            <div className="content-stretch flex items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="section title">
              <TextText text="當日行程" />
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[12px] items-start justify-center px-0 py-[8px] relative shrink-0 w-full" data-name="article">
                <div className="content-stretch flex flex-col items-start justify-between overflow-clip relative self-stretch shrink-0 w-[80px]" data-name="image container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="bg-[rgba(0,0,0,0.05)] h-[80px] shrink-0 w-full" data-name="image" />
                  </div>
                  <Wrapper3 additionalClassNames="h-[42px]" text="+ Spent" additionalClassNames1="size-full" />
                </div>
                <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
                  <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Afternoon
                  </p>
                  <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    12:00 PM - 4:00 PM
                  </p>
                  <div className="content-stretch flex gap-[6px] items-center overflow-clip px-0 py-[4px] relative shrink-0 w-full" data-name="Selection">
                    <LabelNormalText text="Lunch" />
                    <LabelNormalText text="Sightseeing" />
                  </div>
                  <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Lunch at Le Relais de l’Entrecôte, Sightseeing around Montmartre, Visit Sacré-Cœur
                  </p>
                  <div className="content-stretch flex items-center px-0 py-[4px] relative shrink-0 w-full" data-name="user">
                    <IconButtonsText text="📅" />
                  </div>
                  <div className="content-stretch flex h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="map container">
                    <ImageAndText text="Your travel route" />
                  </div>
                </div>
              </div>
              <Card>
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="user">
                  <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Avatar">
                    <div className="bg-[rgba(0,0,0,0.1)] rounded-[24px] shrink-0 size-[24px]" data-name="avatar" />
                    <Helper1 text="Eve" text1="2025/03/06 12:01" />
                  </div>
                  <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                    -$800
                  </p>
                </div>
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="user">
                  <AvatarText text="Amazing trip, would highly recommend!" />
                </div>
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="user">
                  <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Avatar">
                    {[...Array(3).keys()].map((_, i) => (
                      <div className="bg-[rgba(0,0,0,0.1)] rounded-[24px] shrink-0 size-[24px]" data-name="avatar" />
                    ))}
                  </div>
                  <MynauiEdit />
                </div>
              </Card>
              <Helper2 />
            </div>
            <Frame />
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[12px] items-start justify-center px-0 py-[8px] relative shrink-0 w-full" data-name="article">
                <div className="content-stretch flex flex-col items-start justify-between overflow-clip relative self-stretch shrink-0 w-[80px]" data-name="image container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="bg-[rgba(0,0,0,0.05)] h-[80px] shrink-0 w-full" data-name="image" />
                  </div>
                  <Wrapper3 additionalClassNames="h-[42px]" text="+ Spent" additionalClassNames1="size-full" />
                </div>
                <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
                  <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Afternoon
                  </p>
                  <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    12:00 PM - 4:00 PM
                  </p>
                  <div className="content-stretch flex gap-[6px] items-center overflow-clip px-0 py-[4px] relative shrink-0 w-full" data-name="Selection">
                    <LabelNormalText text="Lunch" />
                    <LabelNormalText text="Sightseeing" />
                  </div>
                  <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Lunch at Le Relais de l’Entrecôte, Sightseeing around Montmartre, Visit Sacré-Cœur
                  </p>
                  <div className="content-stretch flex items-center px-0 py-[4px] relative shrink-0 w-full" data-name="user">
                    <IconButtonsText text="📅" />
                  </div>
                  <div className="content-stretch flex h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="map container">
                    <ImageAndText text="Your travel route" />
                  </div>
                </div>
              </div>
              {[...Array(2).keys()].map((_, i) => (
                <Card>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="user">
                    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Avatar">
                      <div className="bg-[rgba(0,0,0,0.1)] rounded-[24px] shrink-0 size-[24px]" data-name="avatar" />
                      <Helper1 text="Eve" text1="2025/03/06 12:01" />
                    </div>
                    <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                      -$800
                    </p>
                  </div>
                  <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="user">
                    <AvatarText text="Amazing trip, would highly recommend!" />
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="user">
                    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Avatar">
                      {[...Array(3).keys()].map((_, i) => (
                        <div className="bg-[rgba(0,0,0,0.1)] rounded-[24px] shrink-0 size-[24px]" data-name="avatar" />
                      ))}
                    </div>
                    <MynauiEdit />
                  </div>
                </Card>
              ))}
              <Helper2 />
            </div>
            <Frame />
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[12px] items-start justify-center px-0 py-[8px] relative shrink-0 w-full" data-name="article">
                <div className="content-stretch flex flex-col items-start justify-between overflow-clip relative self-stretch shrink-0 w-[80px]" data-name="image container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="bg-[rgba(0,0,0,0.05)] h-[80px] shrink-0 w-full" data-name="image" />
                  </div>
                  <Wrapper3 additionalClassNames="h-[42px]" text="+ Spent" additionalClassNames1="size-full" />
                </div>
                <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
                  <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Afternoon
                  </p>
                  <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    12:00 PM - 4:00 PM
                  </p>
                  <div className="content-stretch flex gap-[6px] items-center overflow-clip px-0 py-[4px] relative shrink-0 w-full" data-name="Selection">
                    <LabelNormalText text="Lunch" />
                    <LabelNormalText text="Sightseeing" />
                  </div>
                  <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Lunch at Le Relais de l’Entrecôte, Sightseeing around Montmartre, Visit Sacré-Cœur
                  </p>
                  <div className="content-stretch flex items-center px-0 py-[4px] relative shrink-0 w-full" data-name="user">
                    <IconButtonsText text="📅" />
                  </div>
                  <div className="content-stretch flex h-[120px] items-start overflow-clip relative shrink-0 w-full" data-name="map container">
                    <ImageAndText text="Your travel route" />
                  </div>
                </div>
              </div>
              <Helper2 />
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Button">
              <Wrapper3 additionalClassNames="bg-white" text="Edit" additionalClassNames1="w-full" />
              <div className="bg-black relative rounded-[8px] shrink-0 w-full" data-name="primary">
                <div className="flex flex-col items-center justify-center size-full">
                  <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[10px] relative w-full">
                    <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[22px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Add
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white bottom-0 content-stretch flex items-start left-0 overflow-clip px-[8px] py-[4px] right-0 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)]" data-name="bottom nav">
        <Tab1>
          <Wrapper4>
            <g id="material-symbols-light:home-outline-rounded">
              <path d={svgPaths.p3f8cb400} fill="var(--fill-0, black)" id="Vector" />
            </g>
          </Wrapper4>
          <Text text="Home" additionalClassNames="font-['Roboto:Regular',sans-serif] h-[14px] text-black" />
        </Tab1>
        <Tab1 additionalClassNames="bg-black">
          <div className="overflow-clip relative shrink-0 size-[28px]" data-name="meteor-icons:calendar">
            <div className="absolute inset-[17.86%_21.07%]" data-name="Group">
              <div className="absolute inset-[-2.78%_-3.09%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 19">
                  <g id="Group">
                    <path d={svgPaths.pa030100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgPaths.pa72f00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <Text text="Explore" additionalClassNames="font-['Roboto:Regular',sans-serif] h-[14px] text-white" />
        </Tab1>
        <Tab1>
          <Wrapper4>
            <g id="lucide:ticket">
              <path d={svgPaths.p16b6cd00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </Wrapper4>
          <Text text="Notifications" additionalClassNames="font-['Roboto:Regular',sans-serif] h-[14px] text-black" />
        </Tab1>
        <Tab1>
          <div className="overflow-clip relative shrink-0 size-[28px]" data-name="tabler:shopping-cart">
            <div className="absolute inset-[12.5%_16.67%]" data-name="Group">
              <div className="absolute inset-[-2.38%_-2.68%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
                  <g id="Group">
                    <path d={svgPaths.p2dc91b00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgPaths.p11febe80} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgPaths.p15a11980} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <Text text="Settings" additionalClassNames="font-['Roboto:Regular',sans-serif] h-[14px] text-black" />
        </Tab1>
        <Tab1>
          <Wrapper4>
            <g id="proicons:food">
              <path d={svgPaths.p232fe280} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </Wrapper4>
          <Text text="Settings" additionalClassNames="font-['Roboto:Regular',sans-serif] h-[14px] text-black" />
        </Tab1>
      </div>
    </div>
  );
}