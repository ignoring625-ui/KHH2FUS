import svgPaths from "./svg-5691zqr5ed";
import clsx from "clsx";
import imgImage from "figma:asset/dce651d5182d4c0a4ee7d91b5920a538659cc5a3.png";
import imgImage1 from "figma:asset/6db79c63d51c7155e810df570fafe386eab3fd8f.png";
import imgImage2 from "figma:asset/c6f50a588d1550221e2a03ec0e3015999016b3b0.png";
import imgImage3 from "figma:asset/61a3b3999dbe705614b8b546a7e62efbbaa1356d.png";
import imgImage4 from "figma:asset/0ec96a8b9ac507a716aa6038931cc341f52c853d.png";
import imgImage5 from "figma:asset/f3a84ff60870e6a63c7cb895ad52ce3f81fc60fe.png";
import imgImage6 from "figma:asset/44753ce82d9a47b8c5650e82e54156a884279f7e.png";

function Wrapper5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[28px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        {children}
      </svg>
    </div>
  );
}

function Image({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {children}
      </div>
      <div className="absolute bottom-[8px] content-stretch flex gap-[4px] items-center justify-center left-1/2 translate-x-[-50%]">
        <div className="bg-white h-[4px] rounded-[100px] shrink-0 w-[20px]" />
        <div className="bg-[rgba(0,0,0,0.3)] rounded-[100px] shrink-0 size-[4px]" />
        <div className="bg-[rgba(0,0,0,0.3)] rounded-[100px] shrink-0 size-[4px]" />
        <div className="bg-[rgba(0,0,0,0.3)] rounded-[100px] shrink-0 size-[4px]" />
      </div>
    </div>
  );
}

function Wrapper4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[308px] relative rounded-[6px] shrink-0 w-[200px]">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[268px] min-h-px min-w-px relative rounded-[6px] shrink-0">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col items-center justify-center size-full">
      <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[10px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] relative rounded-[2px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[4px] py-[2px] relative rounded-[inherit]">{children}</div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("basis-0 grow min-h-px min-w-px relative rounded-[6px] shrink-0", additionalClassNames)}>
      <div className="overflow-clip rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Metric1({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper>
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[12px] relative text-nowrap w-full">{children}</div>
    </Wrapper>
  );
}

function Metric({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper additionalClassNames="h-[100px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[12px] relative size-full text-nowrap">{children}</div>
    </Wrapper>
  );
}
type TabProps = {
  additionalClassNames?: string;
};

function Tab({ children, additionalClassNames = "" }: React.PropsWithChildren<TabProps>) {
  return (
    <div className={clsx("basis-0 grow min-h-px min-w-px relative rounded-[12px] shrink-0", additionalClassNames)}>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[12px] py-[8px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function TextContent1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[8px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function List({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-center px-[12px] py-0 relative w-full">{children}</div>
      </div>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] text-center text-nowrap w-full", additionalClassNames)}>
      <p className="[white-space-collapse:collapse] leading-[14px] overflow-ellipsis overflow-hidden">{text}</p>
    </div>
  );
}
type LabelNormalText1Props = {
  text: string;
};

function LabelNormalText1({ text }: LabelNormalText1Props) {
  return (
    <Wrapper1>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
    </Wrapper1>
  );
}
type LabelNormalTextProps = {
  text: string;
};

function LabelNormalText({ text }: LabelNormalTextProps) {
  return (
    <Wrapper1>
      <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
    </Wrapper1>
  );
}
type TextProps = {
  text: string;
  text1: string;
};

function Text({ text, text1 }: TextProps) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <p className="font-['Roboto:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
      <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text1}
      </p>
    </div>
  );
}
type SecondayTextProps = {
  text: string;
};

function SecondayText({ text }: SecondayTextProps) {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Wrapper2>
        <p className="font-['Roboto:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          {text}
        </p>
      </Wrapper2>
    </div>
  );
}

function Helper2() {
  return (
    <div className="absolute bottom-0 h-0 left-0 right-0">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 336 1">
          <path d="M0 0.5H336" id="Vector 200" stroke="var(--stroke-0, black)" strokeOpacity="0.1" />
        </svg>
      </div>
    </div>
  );
}

function MaterialSymbolsLightAdd() {
  return (
    <div className="h-[16px] relative shrink-0 w-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 16">
        <g id="material-symbols-light:add">
          <path d={svgPaths.p34314480} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}
type Helper1Props = {
  text: string;
  text1: string;
};

function Helper1({ text, text1 }: Helper1Props) {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal grow items-start min-h-px min-w-px relative shrink-0">
      <p className="leading-[20px] relative shrink-0 text-[14px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
      <p className="leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text1}
      </p>
    </div>
  );
}
type FrameTextProps = {
  text: string;
};

function FrameText({ text }: FrameTextProps) {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] relative rounded-[16px] shrink-0 size-[32px]">
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-1/2 overflow-ellipsis overflow-hidden size-[32px] text-[20px] text-black text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="[white-space-collapse:collapse] leading-[32px] overflow-ellipsis overflow-hidden">{text}</p>
      </div>
    </div>
  );
}
type TextContentProps = {
  text: string;
  text1: string;
};

function TextContent({ text, text1 }: TextContentProps) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
            {text}
          </p>
          <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
            {text1}
          </p>
          <div className="content-stretch flex font-normal gap-[8px] items-center relative shrink-0 text-black text-nowrap w-full">
            <div className="flex flex-col font-['Roboto:Regular',sans-serif] justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 size-[24px] text-[16px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="[white-space-collapse:collapse] leading-[24px] overflow-ellipsis overflow-hidden text-nowrap">{"🛫"}</p>
            </div>
            <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[16px] relative shrink-0 text-[12px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              {"小港機場"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
type HelperProps = {
  text: string;
  text1: string;
};

function Helper({ text, text1 }: HelperProps) {
  return (
    <div className="content-stretch flex font-normal items-start justify-between leading-[20px] relative shrink-0 text-[14px] w-full">
      <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] overflow-ellipsis overflow-hidden relative shrink-0 text-[rgba(0,0,0,0.5)]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
      <p className="font-['Roboto:Regular',sans-serif] overflow-ellipsis overflow-hidden relative shrink-0 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text1}
      </p>
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
              <p className="basis-0 font-['Roboto:Medium',sans-serif] font-medium grow leading-[24px] min-h-px min-w-px relative shrink-0 text-[20px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                App Name
              </p>
              <div className="content-stretch flex items-center p-[4px] relative shrink-0">
                <div className="relative shrink-0 size-[20px]" data-name="ic-search">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g id="ic-search">
                      <path clipRule="evenodd" d={svgPaths.p401e00} fill="var(--fill-0, black)" fillRule="evenodd" id="shape" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <List>
        <div className="content-stretch flex items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="section title">
          <TextText text="匯率換算計算機" />
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="row">
          <div className="basis-0 grow min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="metric">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex flex-col gap-[4px] items-start p-[12px] relative text-nowrap w-full whitespace-pre">
                <Helper text="韓幣" text1="1" />
                <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[28px] overflow-ellipsis overflow-hidden relative shrink-0 text-[20px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                  17,800
                </p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="chip">
            <div className="relative shrink-0 size-[24px]" data-name="basil:exchange-outline">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="basil:exchange-outline">
                  <path d={svgPaths.p262c3a30} fill="var(--fill-0, black)" id="Vector" />
                </g>
              </svg>
            </div>
          </div>
          <Wrapper>
            <div className="content-stretch flex flex-col gap-[4px] items-start p-[12px] relative text-nowrap w-full whitespace-pre">
              <Helper text="台幣" text1="0.02" />
              <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[28px] overflow-ellipsis overflow-hidden relative shrink-0 text-[20px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                376.32
              </p>
            </div>
          </Wrapper>
        </div>
      </List>
      <List>
        <div className="content-stretch flex items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="section title">
          <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="text">
            <p className="font-['Roboto:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
              今日行程
            </p>
            <div className="content-stretch flex font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal items-start justify-between leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-nowrap w-full whitespace-pre">
              <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                2026/03/06 (星期五) 12:30
              </p>
              <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                刷新
              </p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="row">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center pl-0 pr-[121px] py-0 relative w-full">
              <Wrapper4>
                <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="image container">
                  <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="image">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
                  </div>
                </div>
                <TextContent text="12:05 - 15:00" text1="Kaosihung" />
              </Wrapper4>
              <Wrapper4>
                <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="image container">
                  <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="image">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
                    <div className="absolute bg-[rgba(0,0,0,0.8)] content-stretch flex flex-col items-center justify-center left-0 px-[12px] py-[4px] rounded-br-[6px] rounded-tl-[6px] top-0" data-name="tag">
                      <p className="font-['Roboto:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                        當前
                      </p>
                    </div>
                  </div>
                </div>
                <TextContent text="12:05 - 15:00" text1="Kaosihung" />
              </Wrapper4>
              <Wrapper4>
                <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="image container">
                  <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="image">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
                  </div>
                </div>
                <TextContent text="12:05 - 15:00" text1="Kaosihung" />
              </Wrapper4>
            </div>
          </div>
        </div>
      </List>
      <div className="relative shrink-0 w-full" data-name="Button">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start px-[12px] py-0 relative w-full">
            <div className="bg-black relative rounded-[8px] shrink-0 w-full" data-name="primary">
              <Wrapper2>
                <p className="font-['Roboto:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[22px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                  查看所有行程
                </p>
              </Wrapper2>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="list">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-0 relative w-full">
            <div className="content-stretch flex items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="section title">
              <TextText text="票券資訊" />
            </div>
            <div className="content-stretch flex gap-[8px] items-center justify-center px-0 py-[12px] relative shrink-0 w-full" data-name="item">
              <FrameText text="🛫" />
              <Helper1 text="機票" text1="台灣高雄 往返 韓國釜山" />
              <Helper2 />
              <MaterialSymbolsLightAdd />
            </div>
            <div className="content-stretch flex gap-[8px] items-center justify-center px-0 py-[12px] relative shrink-0 w-full" data-name="item">
              <FrameText text="🚅" />
              <Helper1 text="韓國地鐵" text1="共計 16 項" />
              <Helper2 />
              <MaterialSymbolsLightAdd />
            </div>
            <div className="content-stretch flex gap-[8px] items-center justify-center px-0 py-[12px] relative shrink-0 w-full" data-name="item">
              <FrameText text="🗼" />
              <Helper1 text="參觀博物館" text1="共計 4 項" />
              <MaterialSymbolsLightAdd />
              <Helper2 />
            </div>
            <SecondayText text="查看所有票券" />
          </div>
        </div>
      </div>
      <List>
        <div className="content-stretch flex items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="section title">
          <Text text="美食清單" text1="想要造訪的餐廳" />
        </div>
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="row">
          <Wrapper3>
            <div className="content-stretch flex h-[164px] items-start overflow-clip relative shrink-0 w-full" data-name="image container">
              <Image>
                <div className="absolute bg-[rgba(0,0,0,0.05)] inset-0" />
                <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage3} />
              </Image>
            </div>
            <TextContent1>
              <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                Goban Sikdang
              </p>
              <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0 w-full" data-name="Selection">
                <LabelNormalText text="韓式燒烤餐廳" />
                <LabelNormalText1 text="4.8⭐" />
              </div>
              <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                釜山海雲台的烤肉推薦🇰🇷必點五花肉超 crispy
              </p>
            </TextContent1>
          </Wrapper3>
          <Wrapper3>
            <div className="content-stretch flex h-[164px] items-start overflow-clip relative shrink-0 w-full" data-name="image container">
              <Image>
                <div className="absolute bg-[rgba(0,0,0,0.05)] inset-0" />
                <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage4} />
              </Image>
            </div>
            <TextContent1>
              <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                錦繡河豚湯
              </p>
              <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0 w-full" data-name="Selection">
                <LabelNormalText text="河豚料理餐廳" />
                <LabelNormalText1 text="4.2⭐" />
              </div>
              <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                河豚肉
                <br aria-hidden="true" />
                一間好地道嘅韓國河豚肉
              </p>
            </TextContent1>
          </Wrapper3>
        </div>
        <div className="content-stretch flex items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="section title">
          <Text text="購物清單" text1="想要購買的伴手禮" />
        </div>
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="row">
          <Wrapper3>
            <div className="content-stretch flex h-[164px] items-start overflow-clip relative shrink-0 w-full" data-name="image container">
              <Image>
                <div className="absolute bg-[rgba(0,0,0,0.05)] inset-0" />
                <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage5} />
              </Image>
            </div>
            <TextContent1>
              <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                ZERO軟糖
              </p>
              <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0 w-full" data-name="Selection">
                <LabelNormalText text="零食" />
                <LabelNormalText text="韓國限定" />
              </div>
              <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                韓國必定要買
              </p>
            </TextContent1>
          </Wrapper3>
          <Wrapper3>
            <div className="content-stretch flex h-[164px] items-start overflow-clip relative shrink-0 w-full" data-name="image container">
              <Image>
                <div className="absolute bg-[rgba(0,0,0,0.05)] inset-0" />
                <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage6} />
              </Image>
            </div>
            <TextContent1>
              <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                紅豆鯛魚燒蛋糕
              </p>
              <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0 w-full" data-name="Selection">
                <LabelNormalText text="零食" />
                <LabelNormalText text="台灣也有" />
              </div>
              <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[12px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                聽說吃起來普普通通
              </p>
            </TextContent1>
          </Wrapper3>
        </div>
        <SecondayText text="查看所有清單" />
      </List>
      <div className="absolute bg-white bottom-0 content-stretch flex items-start left-0 overflow-clip px-[8px] py-[4px] right-0 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)]" data-name="bottom nav">
        <Tab additionalClassNames="bg-black">
          <Wrapper5>
            <g id="material-symbols-light:home-outline-rounded">
              <path d={svgPaths.p3f8cb400} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </Wrapper5>
          <Text1 text="首頁" additionalClassNames="text-white" />
        </Tab>
        <Tab>
          <div className="overflow-clip relative shrink-0 size-[28px]" data-name="meteor-icons:calendar">
            <div className="absolute inset-[17.86%_21.07%]" data-name="Group">
              <div className="absolute inset-[-2.78%_-3.09%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 19">
                  <g id="Group">
                    <path d={svgPaths.pa030100} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgPaths.pa72f00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <Text1 text="行程" additionalClassNames="text-black" />
        </Tab>
        <Tab>
          <Wrapper5>
            <g id="lucide:ticket">
              <path d={svgPaths.p16b6cd00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </Wrapper5>
          <Text1 text="票券" additionalClassNames="text-black" />
        </Tab>
        <Tab>
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
          <Text1 text="清單" additionalClassNames="text-black" />
        </Tab>
        <Tab>
          <Wrapper5>
            <g id="material-symbols-light:money-bag-outline">
              <path d={svgPaths.p2410a480} fill="var(--fill-0, black)" id="Vector" />
            </g>
          </Wrapper5>
          <Text1 text="開銷" additionalClassNames="text-black" />
        </Tab>
      </div>
      <List>
        <div className="content-stretch flex items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="section title">
          <TextText text="儀表板" />
        </div>
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="row">
          <Metric>
            <p className="[white-space-collapse:collapse] font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
              行程總開銷
            </p>
            <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[28px] overflow-ellipsis overflow-hidden relative shrink-0 text-[20px] text-black whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              $1780
            </p>
            <p className="[white-space-collapse:collapse] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
              TWD
            </p>
          </Metric>
          <Metric1>
            <p className="[white-space-collapse:collapse] font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
              旅行進度
            </p>
            <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[28px] overflow-ellipsis overflow-hidden relative shrink-0 text-[20px] text-black whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Day 2
            </p>
            <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-black whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              還有三天⭐
            </p>
          </Metric1>
        </div>
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="row">
          <Metric1>
            <p className="[white-space-collapse:collapse] font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
              待辦事項
            </p>
            <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[28px] overflow-ellipsis overflow-hidden relative shrink-0 text-[20px] text-black whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              4
            </p>
            <p className="[white-space-collapse:collapse] font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
              有 2 項截止日快到了
            </p>
          </Metric1>
          <Metric>
            <p className="[white-space-collapse:collapse] font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] min-w-full overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
              預期花費
            </p>
            <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[28px] overflow-ellipsis overflow-hidden relative shrink-0 text-[20px] text-black whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              $10000
            </p>
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-black whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              -$880
            </p>
          </Metric>
        </div>
      </List>
    </div>
  );
}