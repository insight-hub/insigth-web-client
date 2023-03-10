import { StandardLonghandProperties } from 'csstype';
import { ReactNode } from 'react';

import { styled } from '../utils-styled-components';
import {
  Color,
  getLayoutStyles,
  getSpacingStyles,
  mapProps,
  Margin,
  Padding,
  PropClassNameMap,
  toCssProp,
} from '../core';

export enum textType {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  P = 'p',
  Span = 'span',
}

interface NonCssProp {
  type?: textType;
  children: ReactNode;
}

interface CssProps {
  weigth?: StandardLonghandProperties['fontWeight'];
  size?: StandardLonghandProperties['fontSize'];
  color?: StandardLonghandProperties['color'] | Color;
  padding?: Padding;
  margin?: Margin;
  lineHeight?: StandardLonghandProperties['lineHeight'];
}

type Props = NonCssProp & CssProps;

const textPropMap: PropClassNameMap<Required<CssProps>> = {
  ...mapProps,
  weigth: toCssProp('font-weight'),
  size: toCssProp('font-size'),
  color: toCssProp('color'),
  padding: (_, v) => getSpacingStyles(v, 'padding'),
  margin: (_, v) => getSpacingStyles(v, 'margin'),
  lineHeight: toCssProp('line-height'),
};

export const Text = styled.p
  .attrs((props: Props) => {
    return {
      as: props.type ?? textType.P,
    };
  })
  .withConfig({
    shouldForwardProp: (prop, fn) => {
      if (prop in textPropMap) {
        return false;
      }

      return fn(prop);
    },
  })<Props>((props) => getLayoutStyles(props, textPropMap));

Text.displayName = 'Text';
