import React from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import '../../css/custom-tooltip.css';

const modifiers = [
  {
    name: 'offset',
    options: {
      offset: [0, 8],
    },
  },
];

const Tooltip = ({ children, tooltip, disable, ...props }) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement,
    }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container',
        })}
      >
        {
          <div
            {...getArrowProps({
              ref: arrowRef,
              className: 'tooltip-arrow',
              'data-placement': placement,
            })}
          />
        }
        {tooltip}
      </div>
    )}
    modifiers={modifiers}
  >
    {({ getTriggerProps, triggerRef }) => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: 'trigger',
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
);

export default Tooltip;
