// ChartInteractions.ts

export class ChartInteractions {
  private readonly container: HTMLElement;
  private activeElement: string | null = null;
  private hoveredElement: string | null = null;
  private tooltipElement: HTMLElement;
  private callbacks: Map<string, Function[]> = new Map();

  constructor(container: HTMLElement) {
    this.container = container;
    this.tooltipElement = this.createTooltip();
    this.initializeEventListeners();
  }

  private createTooltip(): HTMLElement {
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip hidden';
    this.container.appendChild(tooltip);
    return tooltip;
  }

  private initializeEventListeners(): void {
    this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.container.addEventListener('click', this.handleClick.bind(this));
    this.container.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

  public on(event: string, callback: Function): void {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)?.push(callback);
  }

  private emit(event: string, data?: any): void {
    this.callbacks.get(event)?.forEach(callback => callback(data));
  }

  private handleMouseMove(event: MouseEvent): void {
    const element = this.findElementUnderCursor(event);
    
    if (element !== this.hoveredElement) {
      if (this.hoveredElement) {
        this.emit('elementLeave', this.hoveredElement);
      }
      if (element) {
        this.emit('elementEnter', element);
      }
      this.hoveredElement = element;
    }

    if (element) {
      this.updateTooltip(event, element);
    } else {
      this.hideTooltip();
    }
  }

  private handleClick(event: MouseEvent): void {
    const element = this.findElementUnderCursor(event);
    
    if (element === this.activeElement) {
      this.activeElement = null;
      this.emit('elementDeselect', element);
    } else {
      const previousActive = this.activeElement;
      this.activeElement = element;
      
      if (previousActive) {
        this.emit('elementDeselect', previousActive);
      }
      if (element) {
        this.emit('elementSelect', element);
      }
    }
  }

  private handleMouseLeave(): void {
    if (this.hoveredElement) {
      this.emit('elementLeave', this.hoveredElement);
      this.hoveredElement = null;
    }
    this.hideTooltip();
  }

  private findElementUnderCursor(event: MouseEvent): string | null {
    const elements = document.elementsFromPoint(event.clientX, event.clientY);
    const interactiveElement = elements.find(element => element.hasAttribute('data-interactive'));
    return interactiveElement ? interactiveElement.getAttribute('data-interactive') : null;
  }

  private updateTooltip(event: MouseEvent, element: string): void {
    const rect = this.container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.tooltipElement.style.transform = `translate(${x}px, ${y}px)`;
    this.tooltipElement.classList.remove('hidden');
  }

  private hideTooltip(): void {
    this.tooltipElement.classList.add('hidden');
  }

  public destroy(): void {
    this.container.removeEventListener('mousemove', this.handleMouseMove);
    this.container.removeEventListener('click', this.handleClick);
    this.container.removeEventListener('mouseleave', this.handleMouseLeave);
    this.tooltipElement.remove();
  }
}