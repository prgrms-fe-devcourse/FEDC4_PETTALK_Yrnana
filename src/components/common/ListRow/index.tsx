import styled from '@emotion/styled'
import { type ComponentProps, type ReactNode } from 'react'

import defaultProfileImage from '@/assets/images/defaultProfileImage.png'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/Text'
import { type KeyOfPalette, type KeyOfTypo } from '@/styles/theme'

interface ListRowProps extends ComponentProps<'div'> {
  rightElement: ReactNode
  leftImage?: string | undefined
  mainText: ReactNode
  textTypo?: KeyOfTypo
  textColor?: KeyOfPalette
  imageGap?: number
  gap?: number
  subElement?: ReactNode
  fullWidth?: boolean
}

/**
 * @param rightElement : 오른쪽에 위치시킬 React Element
 * @param leftImage : 왼쪽에 위치시킬 Image 컴포넌트
 * @param mainText: 왼쪽에 위치시킬 main Text
 * @param textTypo : main Text에 적용할 typo
 * @param textColor: main Text에 적용시킬 color
 * @param imageGap : image와 Text 사이의 gap
 * @param gap : text와 subText 사이의 gap 결정
 * @param subElement: main Text 아래에 위치할 React Element
 * @param fullWidth : true로 설정할 경우 width: 100%, 기본값 true
 */

const ListRow = ({
  rightElement,
  leftImage = defaultProfileImage,
  mainText,
  textTypo = 'Body_13',
  textColor = 'BLACK',
  gap = 4,
  imageGap = 8,
  subElement,
  fullWidth = true,
  ...props
}: ListRowProps) => {
  return (
    // TODO: Padding 컴포넌트 생성되면 추후 Padding도 추가할 예정입니다.
    <MainFlexBox fullWidth={fullWidth} {...props}>
      <SubFlexBox gap={imageGap}>
        {leftImage ? <ProfileImage size={35} image={leftImage} updatable={false} /> : ''}
        <TextFlexBox gap={gap}>
          <StyledText text={mainText} typo={textTypo} color={textColor} />
          {subElement && subElement}
        </TextFlexBox>
      </SubFlexBox>
      {rightElement}
    </MainFlexBox>
  )
}

const MainFlexBox = styled.div<{ fullWidth: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : undefined)};
`

const SubFlexBox = styled.div<{ gap: number }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ gap }) => `${gap}px`};
`

const TextFlexBox = styled.div<{ gap: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ gap }) => `${gap}px`};
  align-items: flex-start;
`

const StyledText = ({
  text,
  typo,
  color,
  ...props
}: {
  text: ReactNode
  typo: KeyOfTypo
  color: KeyOfPalette
} & ComponentProps<'div'>) => {
  return (
    <>
      {typeof text === 'string' ? (
        <Text typo={typo} color={color} {...props}>
          {text}
        </Text>
      ) : (
        <div {...props}>{text}</div>
      )}
    </>
  )
}
export default ListRow
